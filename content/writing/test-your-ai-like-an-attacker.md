---
title: "Test your AI like an attacker would"
description: "Happy-path demos prove an LLM feature works. Adversarial testing proves it won’t embarrass you."
date: "2026-08-24"
slug: "test-your-ai-like-an-attacker"
---

Every LLM feature passes its demo. You ask the question you designed it for, it gives the answer you hoped for, and everyone nods.

Users don’t stay on the happy path. Some are curious, some are careless, and a few are actively trying to break things.

So the questions I care about now are different. What happens if a document in the knowledge base contains instructions? What if a user asks the assistant to ignore its rules, or to reveal its system prompt? What if a tool call gets arguments it was never meant to receive? What leaks if retrieval pulls a record from the wrong tenant?

None of these are exotic. Prompt injection, data leakage, and over-permissioned tools are some of the most common ways AI features fail in production.

The fix isn’t one clever prompt. It’s layers: treat model output as untrusted input, scope tools to the least they need, keep tenant boundaries in the data layer rather than the prompt, and keep a growing set of adversarial test cases that run like any other test suite.

If you don’t try to break it, someone else will do it for you.
