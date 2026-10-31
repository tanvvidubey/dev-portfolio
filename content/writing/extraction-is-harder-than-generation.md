---
title: "Extraction is harder than generation"
description: "Getting a model to write is easy. Getting it to pull the right fact from a messy document, every time, is engineering."
date: "2026-09-21"
slug: "extraction-is-harder-than-generation"
---

Generating text is the part of AI everyone sees. Summaries, drafts, chat replies. It feels like the hard part.

In document-heavy products, it usually isn’t. The hard part is extraction: reading a forty-page PDF with scanned tables, footnotes, and inconsistent headings, and reliably pulling out the one value that matters.

Generation can be “good enough.” Extraction has to be right, because something downstream depends on it.

What helps is treating it like a pipeline, not a prompt. Clean and structure the document first. Ask for structured output against a schema, not free text. Validate what comes back. Keep a link to where each value was found, so a person can check it in seconds. And measure accuracy against real documents, not the tidy sample you started with.

It’s less exciting than a good demo. It’s also what makes people trust the system enough to actually use it.
