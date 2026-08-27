"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type FormEvent,
} from "react";

export const PHONE_PATTERN =
  "\\+?[0-9](?:[0-9]|\\s|\\(|\\)|-){6,19}";

type DraftControl = {
  name: string;
  ordinal: number;
  value: string;
  checked?: boolean;
};

type FormDraft = {
  controls: DraftControl[];
};

type DraftableControl =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

function isDraftableControl(
  element: Element,
): element is DraftableControl {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  );
}

function draftableControls(form: HTMLFormElement) {
  return Array.from(
    form.querySelectorAll(
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea',
    ),
  ).filter(
    (element): element is DraftableControl =>
      isDraftableControl(element) &&
      Boolean(element.name) &&
      element.name !== "formGuard",
  );
}

function captureDraft(form: HTMLFormElement): FormDraft {
  const ordinals = new Map<string, number>();

  return {
    controls: draftableControls(form).map((control) => {
      const ordinal = ordinals.get(control.name) ?? 0;
      ordinals.set(control.name, ordinal + 1);

      return {
        name: control.name,
        ordinal,
        value: control.value,
        ...(control instanceof HTMLInputElement &&
        (control.type === "checkbox" || control.type === "radio")
          ? { checked: control.checked }
          : {}),
      };
    }),
  };
}

function applyDraft(form: HTMLFormElement, draft: FormDraft) {
  const ordinals = new Map<string, number>();

  for (const control of draftableControls(form)) {
    const ordinal = ordinals.get(control.name) ?? 0;
    ordinals.set(control.name, ordinal + 1);

    const savedControl = draft.controls.find(
      (candidate) =>
        candidate.name === control.name &&
        candidate.ordinal === ordinal,
    );

    if (!savedControl) {
      continue;
    }

    if (
      control instanceof HTMLInputElement &&
      (control.type === "checkbox" || control.type === "radio")
    ) {
      control.checked = savedControl.checked === true;
    } else {
      control.value = savedControl.value;
    }
  }
}

export function useFormDraft(
  storageKey: string,
  restoreWhen = true,
) {
  const formRef = useRef<HTMLFormElement>(null);

  const saveDraft = useCallback(() => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    try {
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify(captureDraft(form)),
      );
    } catch {
      // A blocked storage area should never prevent form use.
    }
  }, [storageKey]);

  const restoreDraft = useCallback(() => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    try {
      const storedDraft = window.sessionStorage.getItem(storageKey);

      if (!storedDraft) {
        return;
      }

      const draft = JSON.parse(storedDraft) as Partial<FormDraft>;

      if (!Array.isArray(draft.controls)) {
        throw new Error("Invalid form draft");
      }

      applyDraft(form, { controls: draft.controls });
    } catch {
      window.sessionStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const clearDraft = useCallback(() => {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // A blocked storage area should never prevent form use.
    }
  }, [storageKey]);

  useEffect(() => {
    if (!restoreWhen) {
      return;
    }

    const frame = window.requestAnimationFrame(restoreDraft);
    return () => window.cancelAnimationFrame(frame);
  }, [restoreDraft, restoreWhen]);

  return {
    formRef,
    saveDraft,
    restoreDraft,
    clearDraft,
  };
}

function isValidatableControl(
  target: EventTarget,
): target is DraftableControl {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  );
}

function validationErrorId(control: DraftableControl) {
  if (!control.id) {
    const form = control.form;
    const position = form
      ? Array.from(form.elements).indexOf(control)
      : 0;
    control.id = `form-field-${control.name || "control"}-${position}`;
  }

  return `${control.id}-error`;
}

function validationMessage(control: DraftableControl) {
  if (control.validity.valueMissing) {
    return "Please complete this required field.";
  }

  if (control.validity.typeMismatch && control instanceof HTMLInputElement) {
    if (control.type === "email") {
      return "Enter a valid email address.";
    }

    if (control.type === "url") {
      return "Enter a complete public URL, including https://.";
    }
  }

  if (
    control.validity.patternMismatch &&
    control instanceof HTMLInputElement &&
    control.type === "tel"
  ) {
    return "Enter a valid phone number using digits and common separators.";
  }

  if (control.validity.tooShort) {
    const minimum =
      control instanceof HTMLSelectElement ? 0 : control.minLength;
    return `Enter at least ${minimum} characters.`;
  }

  return control.validationMessage || "Check this field and try again.";
}

function removeValidationError(control: DraftableControl) {
  const errorId = validationErrorId(control);
  document.getElementById(errorId)?.remove();
  control.removeAttribute("aria-invalid");
  control.removeAttribute("aria-errormessage");

  const descriptions = (control.getAttribute("aria-describedby") || "")
    .split(/\s+/)
    .filter(Boolean)
    .filter((id) => id !== errorId);

  if (descriptions.length > 0) {
    control.setAttribute("aria-describedby", descriptions.join(" "));
  } else {
    control.removeAttribute("aria-describedby");
  }
}

function showValidationError(control: DraftableControl) {
  const errorId = validationErrorId(control);
  let message = document.getElementById(errorId);

  if (!message) {
    message = document.createElement("p");
    message.id = errorId;
    message.className = "mt-2 text-sm font-semibold leading-6 text-red-700";
    message.dataset.formValidationError = "true";
    control.insertAdjacentElement("afterend", message);
  }

  message.textContent = validationMessage(control);
  control.setAttribute("aria-invalid", "true");
  control.setAttribute("aria-errormessage", errorId);

  const descriptions = new Set(
    (control.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean),
  );
  descriptions.add(errorId);
  control.setAttribute("aria-describedby", Array.from(descriptions).join(" "));
}

export function useAccessibleFormValidation() {
  const handleInvalid = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (isValidatableControl(event.target)) {
        showValidationError(event.target);
      }
    },
    [],
  );

  const handleValidationInput = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (!isValidatableControl(event.target)) {
        return;
      }

      if (event.target.validity.valid) {
        removeValidationError(event.target);
      } else if (event.target.getAttribute("aria-invalid") === "true") {
        showValidationError(event.target);
      }
    },
    [],
  );

  return { handleInvalid, handleValidationInput };
}
