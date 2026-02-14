# Specification

## Summary
**Goal:** Replace the 1–5 star rating flow with free-form written answers across the question screen, saving, and saved-answers history.

**Planned changes:**
- Update the question screen UI to remove the StarRating component and add a multi-line text input for a written answer, including updated English labels/messages.
- Disable the Save action until the written answer is non-empty after trimming whitespace, and add client-side validation with error feedback consistent with existing UI patterns.
- Update the save-answer flow to send/store a written answer string instead of a numeric rating and keep the existing success behavior (including refreshing saved answers).
- Change the backend Answer data shape and related APIs to use `answerText` (and remove `rating`), update candid/type bindings accordingly, and update the Saved Answers view to display written answer text (no star icons).

**User-visible outcome:** Users can type and save written answers to questions, and later view their saved answers as readable text entries in the Saved Answers screen.
