// A generic message type used to communicate between the background script, content script, popup, and options page
interface Message {
  payload:
    | ['toggle_spotlight', {}]
    | ['login', {}]
    | ['error', { message: string }]
    | ['success', { message: string }];
}
