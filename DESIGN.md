# DESIGN.md — Visual & UI Design

Ausmed CPD Quiz (2026)

---

## Design Intent

This experience should feel:

- **Supportive, not exam-like**
- **Confident and professional**
- **Lightly energising without being gimmicky**
- **Clear and frictionless on mobile**

The quiz exists in a compliance context. The visual system must reinforce credibility and clarity while still feeling engaging enough to reduce procrastination around CPD.

Avoid:

- “School test” vibes
- Overly playful or juvenile illustration
- Loud gamification patterns that undermine seriousness
- Dense academic formatting

---

# 1. Overall Visual Direction

## Tone

**Professional + approachable.**

Think:

- Calm confidence
- Clear structure
- Warm, human tone in microcopy
- Minimal but intentional moments of delight

The quiz is about CPD compliance. It should feel like:

> “You’ve got this — let’s check you’re on track.”

Not:

> “Time to pass your test.”

---

## Layout Philosophy

### 1. Single Column, Mobile First

The entire experience should be:

- Single-column
- Narrow readable width
- Comfortable vertical rhythm
- Designed for thumb interaction

Max width recommendation:

- `640px–720px` for content column on desktop
- Centered with generous side gutters

Spacing:

- Large vertical spacing between major sections
- Clear separation between:
  - Question
  - Options
  - Feedback
  - Continue CTA

---

# 2. Typography

## Hierarchy

### H1 — Screen Title

- Used on Intro + Results
- Confident but not oversized
- Should feel modern and clean

### H2 — Question Prompt

- Clear, readable
- Avoid overly long lines
- Keep max 60–70 characters per line

### Body

- Explanation text should be:
  - Slightly smaller than prompt
  - Comfortable line height (1.5–1.6)
  - Broken into short paragraphs

### Microcopy

- Muted color
- Smaller size
- Used for helper text, compliance notes

---

## Text Design Principles

- Never wall-of-text explanations
- Use bold strategically to highlight key phrases
- Prefer short paragraphs over dense blocks
- If needed, use subtle dividers between sections

---

# 3. Color System

## Base Layer

The UI should rely primarily on:

- Neutral background
- White or very light card surfaces
- Strong primary text color
- Soft border or shadow to define panels

Avoid:

- Heavy gradients everywhere
- Bright saturated backgrounds behind questions

---

## Accent Usage

Accent color should be used for:

- Primary CTA buttons
- Progress indicator
- Correct answer state
- Small decorative elements

Keep accent restrained.

---

## Feedback States

### Correct

- Soft success tone (e.g., green tint background)
- Check icon
- Calm, not celebratory explosion

### Incorrect

- Warm warning tone (not harsh red)
- Clear but not alarming

This is formative learning. The tone should be:

> “Here’s the right answer and why.”

Not:

> “You failed.”

---

# 4. Question UI Patterns

## Question Card Structure

Each question should have:

1. Question label / progress (e.g., “Question 4 of 15”)
2. Prompt
3. Optional helper text
4. Options
5. Submit CTA
6. Feedback panel (after submit)
7. Continue CTA

### Card Design

- Rounded corners
- Soft shadow or border
- Clean background
- Generous padding

Avoid cramped layouts.

---

## Option Design (Radio Buttons)

Each option should be:

- Full-width tappable
- Clearly separated
- Comfortable vertical padding
- Obvious selected state

### Selected State

- Clear border change
- Subtle background tint
- Visible focus outline (keyboard)

Avoid tiny radio dots as the only indicator.

---

## Submit Button

Before selection:

- Disabled state clearly visible

After selection:

- Prominent but not oversized

Button should feel:

- Solid
- Confident
- Stable

---

# 5. Feedback Panel

Feedback appears immediately after submit.

## Structure

- State header:
  - ✓ Correct
  - ✕ Not quite
- Correct answer shown explicitly
- Explanation text

Optional:

- Divider between explanation and “Continue”

## Visual Tone

- Slight tinted background
- Distinct from question surface
- Not modal — inline expansion

Avoid:

- Full screen transition
- Overly dramatic animations

---

# 6. Progress Design

## Progress Indicator

Options:

### A. Linear Progress Bar (Recommended)

- Thin, subtle bar at top
- Smooth fill animation
- Accent color

### B. Numeric Only

- “4 of 15”
- Minimal

Best practice:
Use both number + subtle bar.

Avoid:

- Percentage display (feels exam-like)

---

# 7. Profile Section Design

Profile questions should feel:

- Light and fast
- Setup phase
- Not part of “scoring”

Visually distinguish profile section by:

- Softer tone
- “Let’s personalise this” framing

Avoid heavy form aesthetic.

---

# 8. Survey / Reflection Section

This section should feel:

- More conversational
- Slightly less “quiz” rigid

Likert scales:

- Clean horizontal stack
- Even spacing
- Avoid compressing labels

Text inputs:

- Large enough for mobile typing
- Clear placeholder
- Soft border

---

# 9. Results Screen

This is where design matters most.

## Emotional Tone

- Positive
- Encouraging
- Non-judgemental

---

## Score Display

Avoid giant percentage badges.

Instead:

- “You answered 10 of 14 correctly”
- Topic breakdown list

### Topic Breakdown

Display as:

- Topic label
- Mini progress bar
- “3 / 4 correct”

Keep it clean and scannable.

---

## CTA Block

The course recommendation should:

- Sit in its own card
- Have a subtle background
- Clear CTA button

The message adapts to score:

- Low score → “Want a refresher?”
- High score → “You’re on track — share this.”

Avoid alarmist tone.

---

## Secondary Actions

- Checklist download
- Share button

Visually secondary to primary CTA.

---

# 10. Motion Design

Use motion sparingly.

Allowed:

- Smooth progress bar fill
- Subtle feedback panel expansion
- Soft fade transitions

Completion:

- Optional light confetti
- Respect `prefers-reduced-motion`

Avoid:

- Large parallax effects
- Bouncy cartoon motion
- Distracting animations between every question

---

# 11. Accessibility Design Considerations

Visually support:

- Clear focus states
- High contrast between:
  - Text and background
  - Selected vs unselected options
- Large tap targets
- Clear state changes without relying on color alone

Correct/incorrect must not rely solely on color:

- Include icon + text

---

# 12. Visual Restraint Rules

To keep this from drifting:

- No more than 1 primary accent color.
- No more than 2 background surface variations.
- Do not mix illustration styles.
- Do not use emoji excessively.
- Do not use red aggressively (compliance context).

---

# 13. Brand Alignment

The quiz should:

- Feel like a natural extension of Ausmed
- Use brand typography and spacing system where possible
- Maintain consistency with the main marketing site

However:

It can feel slightly more energetic than the core product — this is a campaign moment.

---

# 14. What This Should Not Feel Like

- A university exam
- A government compliance form
- A playful Buzzfeed quiz
- A heavy LMS module

It should feel like:

> A well-designed, helpful CPD check that respects the user’s time and intelligence.

---

# 15. Future-Proofing the UI

The layout should support:

- Additional dynamic questions (hours calculations)
- Minor yearly content updates
- Re-skinning next year without redesigning structure

Keep design modular:

- QuestionCard
- FeedbackPanel
- InfoCard
- ResultSummary
- TopicBreakdownItem

Avoid hardcoding spacing or colors inline — use design tokens.

---

## Final Design Test

If the experience feels:

- Calm
- Clear
- Modern
- Slightly energising
- Respectful of professional standards

You’re on track.

If it feels:

- Busy
- Overly gamified
- Dense
- Or too serious and dull

Refine.
