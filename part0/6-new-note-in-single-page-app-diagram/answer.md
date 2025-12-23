```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: on click "Save" 
    activate browser

    browser->>browser: store note locally on array)
    activate browser
    deactivate browser

        browser->>browser: redraw notes
        activate browser
        deactivate browser

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        
        server->>server: store note on server
        activate server
        deactivate server
        
        server-->>browser: (201 Created) 
        deactivate server

    deactivate browser
    


```