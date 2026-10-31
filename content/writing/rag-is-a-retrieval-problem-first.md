---
title: "RAG is a retrieval problem first"
description: "When answers go wrong, the model is rarely the first thing to fix. Look at what you handed it."
date: "2025-11-16"
slug: "rag-is-a-retrieval-problem-first"
---

When a RAG system gives a bad answer, the instinct is to blame the model. Swap it, tweak the prompt, add “be accurate” in capital letters.

Most of the time, the model did exactly what it was asked. It answered from the context it was given. The context was just wrong.

So I’ve started debugging in the other direction. Before touching the prompt, I look at what came back from retrieval. Were the right chunks there at all? Were they ranked high enough to make the cut? Were they split in a way that kept the meaning intact, or did a table get cut in half?

That one habit changes the work. Chunking strategy, metadata filters, hybrid search, re-ranking: none of it is glamorous, but it’s where most of the accuracy lives.

A good model can’t recover facts it never saw. Get retrieval right, and the generation step starts to look a lot smarter than it is.
