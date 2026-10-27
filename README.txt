KultureKatta shared email attribution corrections

Files:
  app/lib/website-attribution-email.ts
  app/lib/website-forms.ts

Extract into E:\kulture-katta-site so the files land under app\lib.

Changes:
- Rename attribution labels in internal notifications.
- Remove repeated internal notification rows with the same label (first one wins).
- Keep new attribution labels and internal form identifiers out of submitter acknowledgements.
- No changes to recipients, subjects, source tags, email sending or data capture.

Validate:
  npx tsc --noEmit
  npx eslint app/lib/website-attribution-email.ts app/lib/website-forms.ts

Keep changes local until review and testing.
