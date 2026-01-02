# Implementation Plan - Structured Chat Context Control

This plan outlines how to provide the AI chatbot with controlled, structured JSON context from the current page, rather than just raw UI text or HTML.

## User Review Required
> [!IMPORTANT]
> The chatbot will receive a JSON representation of the data you are currently viewing. This is more efficient and accurate than raw text. I will add a UI toggle to let you see and control this context.

## Proposed Changes

### [New Context] BotContext
#### [NEW] [bot_context.tsx](file:///d:/QuizSpark/website/src/lib/bot_context.tsx)
- Create a `BotContext` to hold a generic `data` object.
- Provide a `setBotContext(data: any)` function.

### [App] Main Application
#### [MODIFY] [App.tsx](file:///d:/QuizSpark/website/src/App.tsx)
- Wrap the application in `BotProvider`.

### [Components] GlobalChatBot & ChatBot
#### [MODIFY] [GlobalChatBot.tsx](file:///d:/QuizSpark/website/src/components/custom/GlobalChatBot.tsx)
- Read `botContext` and pass it to `ChatBot`.

#### [MODIFY] [chat_bot.tsx](file:///d:/QuizSpark/website/src/pages/practice_page/chat_bot.tsx)
- Add a prop `contextData`.
- Add a "Context" toggle button in the chat input area.
- Add a tooltip or small popup to "Preview Context" (showing the JSON).
- If enabled, prepend `[PAGE CONTEXT]: <JSON_STRING>` to the user's message before sending.

### [Pages] Injecting Structured Data
#### [MODIFY] [bank_section.tsx](file:///d:/QuizSpark/website/src/pages/home_page/bank_section.tsx)
- Set context to the list of `filtered` banks.

#### [MODIFY] [practice_page.tsx](file:///d:/QuizSpark/website/src/pages/practice_page/practice_page.tsx)
- Set context to the current `practice` object.

#### [MODIFY] [bank_overview_page.tsx](file:///d:/QuizSpark/website/src/pages/bank_overview_page/bank_overview_page.tsx)
- Set context to the current `questionBank`.

## Verification Plan

### Manual Verification
1.  **Context Preview**: On the Question Banks page, open chat, click context icon, and check if the JSON list of banks is correct.
2.  **Toggle Logic**: Verify that turning off context results in standard chat behavior.
3.  **Data Refresh**: Navigate from Banks to Practice; verify the context updates from a list of banks to a specific practice session.
