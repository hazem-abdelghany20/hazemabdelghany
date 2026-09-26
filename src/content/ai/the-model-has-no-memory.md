---
title: "The Model Doesn't Remember You"
date: 2026-09-24
lang: en
topic: context
minutes: 3
description: "When ChatGPT came out, the skill was writing the prompt. Now it's choosing what the model sees, because every new chat starts from zero."
translationOf: "the-model-has-no-memory-ar"
video:
  src: "/media/ai/DdrYNyKjZ2I.mp4"
  poster: "/media/ai/DdrYNyKjZ2I-poster.jpg"
  instagram: "https://www.instagram.com/reel/DdrYNyKjZ2I/"
  seconds: 61
draft: false
---

When ChatGPT first came out, the people winning were the ones who could write a good prompt. Now the people winning are the ones who know exactly what to show it.

Prompt, old era. What the model sees, new era.

## Two people, one subscription

Take two people doing exactly the same job, on exactly the same ChatGPT plan.

The first opens a new chat every time and explains everything from the start. Who he is, what the project is, what he wants. Every day.

The second gives the model his files, last month's work, and samples of how he writes. Then he asks.

Same model. Same subscription. The difference in what comes back is huge. And the reason is simple.

## It starts from zero, every time

The model has no memory. Every new chat starts from zero.

It doesn't know your company, your client, or what you decided yesterday. All it knows about you is what is in front of it right now: the text in this chat and the files attached to it.

Even inside one chat, it isn't remembering. Every time you send a message, the whole conversation goes back to it and it reads it again from the top. Open a new chat and that's gone. You're talking to a stranger again.

Memory in ChatGPT, or Projects in ChatGPT and Claude, don't change that. They store some text and put it back in front of the model for you. It's the same reason Claude Code, which I build my software with, reads a file called CLAUDE.md at the start of every session. The model carries nothing over. The file does.

So when it feels like it gets you, it isn't remembering. It's reading.

## What to put in front of it

In the same message, give it what it needs to see:

- **The file.** The actual brief, the actual contract, the actual draft. Not your summary of it.
- **The decisions you already made.** Otherwise it keeps suggesting the options you rejected last week.
- **An example you liked.** A reply, a format, a way of doing it. Showing beats describing.

## "Write like me" doesn't work

I don't tell it "write in my style". It doesn't know how I write. What is it supposed to copy?

I give it three or four things I wrote before and tell it to continue in the same style. Now it has something to copy.

> That's not a better prompt. It's more information.

## The question changed

The old question: what do I tell the AI?

The new one: what can it see?

So when an answer comes back generic, don't start by rewriting the prompt. Check what it had to work with.

## Try it

Before your next real task, build a small context pack. Keep it in a note and paste it at the top of every new chat, or put it in a Project's instructions so it loads on its own.

```
WHO I AM
[Your role, your company, who you write for. One line each.]

WHAT THIS IS FOR
[The project or client, and the goal of this task.]

DECISIONS ALREADY MADE
- [e.g. The price is fixed. Don't suggest discounts.]
- [e.g. Informal tone, Egyptian Arabic, no formal Arabic.]

FILES
[Paste or attach the brief, the draft, the numbers.]

EXAMPLES I LIKED
[Paste 3 or 4 pieces you wrote or approved before.]

THE TASK
[What you want now, in one or two lines.]
```

Fill it in once. Use it every day. Update the decisions part whenever something changes.

When ChatGPT came out, the winners wrote the best prompt. Now the winners choose what the model sees.
