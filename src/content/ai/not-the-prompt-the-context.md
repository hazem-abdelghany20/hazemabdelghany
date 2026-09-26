---
title: "It's Not the Prompt. It's the Context."
date: 2026-05-17
lang: en
topic: context
minutes: 3
description: "AI gave you a generic answer, so you rewrite the prompt. Usually the prompt is fine and the context is empty: here are the five things that fill it."
translationOf: "not-the-prompt-the-context-ar"
video:
  src: "/media/ai/DYbWHcZkvCl.mp4"
  poster: "/media/ai/DYbWHcZkvCl-poster.jpg"
  instagram: "https://www.instagram.com/reel/DYbWHcZkvCl/"
  seconds: 30
draft: false
---

AI gave you a bad answer. The reflex is to fix the prompt. Rewrite it, make it longer, add "act as an expert", add "please".

Usually that's the wrong fix. It's not the prompt. It's the context.

## The follow-up email

You type: *write a follow-up email to the client.*

You get a template. "I hope this email finds you well." Generic. Bad. You could send it to anyone, which means it says nothing to this client.

Not because the model is stupid. Because it knows nothing: not who the client is, what you proposed, what they pushed back on, or what you agreed next. So it fills every gap with the average follow-up email. And average is what you get.

> The model isn't dumb. The context is empty.

## What context is

**Context is everything the model needs before it answers.** Everything in front of it when it writes, not only the line you typed.

For that email, it's five things:

- **The prompt.** The request itself: write the follow-up. Part of the context, not all of it.
- **Files.** The proposal you sent. The contract.
- **Memory.** Your calls with the client. What they said, what worried them, where you left it.
- **Tools.** Your CRM and your email. Connect them and the model checks the deal stage and reads the last thread itself. No copy/paste.
- **Retrieval.** The company database: past projects, prices, notes. It pulls the one piece that matters for this client.

The last two sound alike. Tools reach into live systems: read the deal, check the inbox, sometimes act. Retrieval is search: it goes through everything you've stored and hands the model only the few lines that matter.

## Same request, different email

Now keep the prompt exactly as it was. Same words, same model, same subscription. Only the context is full.

The email changes completely. It picks up the point the client raised on the call, uses the scope and the number from the proposal, and ends on the next step you agreed. That's the email that closes the deal, and not one word of the request changed.

## Where the prompt still matters

I'm not saying the prompt is useless. It's the first of the five, and a clear request still beats a vague one.

Not every question needs your context. "Explain what an API is" doesn't need your files. But the moment the task is about your work, your client, your company, the model can't guess what it hasn't seen. That's where most bad answers come from.

Context engineering, new era. Prompt engineering, old era. The skill now is deciding what the model sees before it answers.

Start by hand today: paste the proposal and your call notes. Or keep the files in a Claude or ChatGPT project and connect your CRM and email, so you stop pasting.

## Try it

Next time the task is about a real client, fill this in first:

```
Task: Write a follow-up email to [client name] at [company].

Files:
- Proposal and contract: [paste scope, price, open points]

Memory (our calls):
- What they liked: [...]
- What they pushed back on: [...]
- Next step we agreed: [...]

From our tools:
- Deal stage in the CRM: [...]
- Last email in the thread: [paste it]

From our records:
- A similar project we delivered: [one or two lines]

Tone: match this past email of mine: [paste one]
Length: under 150 words, one clear ask.
If something important is missing, ask me before you write.
```

Each block is one of the five. If your CRM and email are connected, swap the tools block for one line: "Check the deal in the CRM and read the last thread first."

Run it twice: first line only, then everything filled in. Compare the two emails.

AI got it wrong? It's not the prompt. It's the context.
