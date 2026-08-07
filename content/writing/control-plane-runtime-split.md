---
title: "Why control plane and runtime should split"
description: "Notes from building agent platforms where governance and execution cannot share one process."
date: "2026-03-01"
slug: "control-plane-runtime-split"
---

Most agent demos put the chat UI, auth, billing, and model calls in one service. That works until someone asks for audit logs, Azure AD RBAC, and a Python tool chain that takes thirty seconds.

The pattern that held up: a **Node control plane** owns tenants, credits, and policy; a **FastAPI runtime** executes steps. The UI talks to the control plane. The runtime reports progress over Socket.IO. Releases stop blocking each other.

The cost is a versioned step contract. The win is being able to answer “who ran this agent?” without reading model logs.
