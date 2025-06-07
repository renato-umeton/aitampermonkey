// --- Mocking Environment ---
let mockLogs = [];
const originalConsoleLog = global.console.log; // Keep a reference if needed, though we override
const originalConsoleError = global.console.error;
global.console = {
    log: (...args) => mockLogs.push(args.join(' ')),
    error: (...args) => mockLogs.push(`ERROR: ${args.join(' ')}`),
    assert: (condition, ...args) => {
        const message = args.join(' ');
        if (!condition) {
            mockLogs.push(`ASSERTION FAILED: ${message}`);
        } else {
            mockLogs.push(`ASSERTION PASSED: ${message}`);
        }
    }
};

const mockDocument = {
    title: "Test Page Title",
    body: {
        innerHTML: "<body>Hello world</body>",
        appendChild: () => {},
        removeChild: () => {},
    },
    // IMPORTANT: Keep a reference to the original createElement for mocks to call back to
    _originalCreateElement: function(tagName) {
        if (tagName === 'div') {
            return {
                innerHTML: '',
                appendChild: function(node) { this.innerHTML += node.outerHTML || "mock node content"; },
            };
        }
        // Basic fallback for other elements if not 'a' or 'div'
        return { appendChild: () => {}, removeChild: () => {}, style: {} };
    },
    createElement: function(tagName) { // This will be overridden in tests for 'a'
        return this._originalCreateElement(tagName);
    },
    appendChild: () => {},
    removeChild: () => {},
    querySelector: (selector) => {
        if (selector === 'article') return null;
        if (selector === 'main') return null;
        return null;
    },
    getElementById: (id) => {
        if (id === 'custom-bm-status-msg') return null;
        return null;
    }
};
global.document = mockDocument;
// Ensure the _originalCreateElement points to a basic version of itself if not further mocked by tests
mockDocument.createElement = mockDocument._originalCreateElement.bind(mockDocument);


const mockWindow = {
    getSelection: () => ({
        toString: () => "",
        getRangeAt: () => ({
            cloneContents: () => {
                const fragment = global.document.createElement('div'); // Use our document's createElement
                fragment.innerHTML = "<span>Selected HTML content by default</span>";
                return { outerHTML: fragment.innerHTML }; // Mocking that appendChild will use outerHTML
            },
        }),
    })
};
global.window = mockWindow;

global.URL = {
    createObjectURL: (blob) => "mock://bloburl/" + (blob ? blob.size : '0'),
    revokeObjectURL: () => {}
};

global.Blob = function(content, options) {
    this.content = content;
    this.options = options;
    this.size = content && content.length > 0 && typeof content[0] === 'string' ? content[0].length : 0;
    mockLogs.push(`Mock Blob created with type: ${options ? options.type : 'unknown'}. Size: ${this.size}`);
};

let turndownServiceInstanceMock;
global.TurndownServiceDefaultMock = function() {
    turndownServiceInstanceMock = {
        turndown: (html) => {
            mockLogs.push(`TurndownService.turndown called with HTML: ${html}`);
            return `markdown for: ${html}`;
        }
    };
    return turndownServiceInstanceMock;
};
global.TurndownService = global.TurndownServiceDefaultMock; // Default to the working mock
global.TurndownServiceDefined = true;

global.alert = (message) => {
    mockLogs.push(`ALERT: ${message}`);
};

function showStatusMessage(text, duration = 3000, isError = false) {
    mockLogs.push(`showStatusMessage: "${text}", isError: ${isError}`);
}

// --- Instrumented save_markdown_code ---
// We will define the main function to be tested, but instrument its inner saveMarkdown
// to capture arguments passed to it.

// Variables to capture args passed to the inner saveMarkdown
global.lastMarkdownContentForTest = "";
global.lastFileNameForTest = "";

// The actual code of the bookmarklet's function, slightly modified for instrumentation
const save_markdown_outer_function = function() {
    // This is the 'code' property of the SAVE_MARKDOWN bookmarklet object

    // INNER function: This is what we instrument
    function saveMarkdown_instrumented(md, filename) {
        global.lastMarkdownContentForTest = md; // Capture args
        global.lastFileNameForTest = filename;
        mockLogs.push(`Inner saveMarkdown called with MD: [${md}] FILENAME: [${filename}]`);

        var blob = new Blob([md], { type: 'text/markdown' });
        var a = document.createElement('a'); // Uses global.document
        a.href = URL.createObjectURL(blob);  // Uses global.URL
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click(); // This will be mocked via document.createElement('a')
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    try {
        // Check our global flag for service availability
        if (typeof TurndownService === 'undefined' || !global.TurndownServiceDefined || TurndownService === null) {
            showStatusMessage("TurndownService is not available.", 3000, true);
            console.error("TurndownService is not available. SAVE_MARKDOWN will not work.");
            alert("TurndownService is not available. SAVE_MARKDOWN will not work.");
            return;
        }
        var turndownService = new TurndownService(); // Uses the mocked global TurndownService

        var selection = window.getSelection().toString().trim(); // Uses global.window
        var markdown;
        var filename;

        if (selection) {
            var range = window.getSelection().getRangeAt(0);
            var div = document.createElement('div'); // Uses global.document
            div.appendChild(range.cloneContents());
            markdown = turndownService.turndown(div.innerHTML);
            filename = (document.title || 'selection') + ' - selection.md'; // Uses global.document
            saveMarkdown_instrumented(markdown, filename); // Call instrumented version
            showStatusMessage("Selection saved as Markdown.", 3000);
        } else {
            let articleElement = document.querySelector('article'); // Uses global.document
            let mainElement = document.querySelector('main');     // Uses global.document
            let bodyToConvert = document.body;                    // Uses global.document

            if (articleElement) { bodyToConvert = articleElement; }
            else if (mainElement) { bodyToConvert = mainElement; }

            markdown = turndownService.turndown(bodyToConvert.innerHTML);
            filename = (document.title || 'page') + '.md';
            saveMarkdown_instrumented(markdown, filename); // Call instrumented version
            showStatusMessage("Page saved as Markdown.", 3000);
        }
    } catch (e) {
        console.error("Error in SAVE_MARKDOWN:", e.message, e.stack);
        alert("An error occurred while trying to save as Markdown: " + e.message);
        showStatusMessage("Error saving Markdown: " + e.message, 4000, true);
    }
};

// --- Test Execution ---
try {
    let lastAnchorDownloadName = "";
    // Store the original document.createElement to restore it after each test if needed
    const originalDocCreateElement = global.document.createElement;

    // Helper to mock 'a' element creation for a test
    const mockAnchorCreation = () => {
        global.document.createElement = (tagName) => {
            if (tagName === 'a') {
                const mockAnchor = {
                    href: '',
                    download: '',
                    style: {},
                    click: () => {
                        mockLogs.push(`Mock anchor clicked. Filename: ${mockAnchor.download}`);
                        lastAnchorDownloadName = mockAnchor.download;
                    },
                };
                return mockAnchor;
            }
            // Use the _originalCreateElement for other tags like 'div' from our initial mock setup
            return mockDocument._originalCreateElement(tagName);
        };
    };

    mockLogs.push("--- Test 1: Save full page ---");
    global.document.title = "Test Page Title";
    global.window.getSelection = () => ({ toString: () => "", getRangeAt: () => null });
    global.document.querySelector = (s) => (s === 'article' ? null : (s === 'main' ? null : null));
    global.document.body.innerHTML = "<body>Full page content</body>";
    global.TurndownServiceDefined = true;
    global.TurndownService = global.TurndownServiceDefaultMock; // Ensure working Turndown
    lastAnchorDownloadName = "";
    global.lastMarkdownContentForTest = "";
    global.lastFileNameForTest = "";
    mockAnchorCreation();

    save_markdown_outer_function();

    console.assert(mockLogs.includes("TurndownService.turndown called with HTML: <body>Full page content</body>"), "Test 1: Turndown called with body HTML");
    console.assert(global.lastMarkdownContentForTest === "markdown for: <body>Full page content</body>", "Test 1: Correct markdown content received by inner saveMarkdown");
    console.assert(lastAnchorDownloadName === "Test Page Title.md", "Test 1: Downloaded filename is correct");
    console.assert(global.lastFileNameForTest === "Test Page Title.md", "Test 1: Correct filename received by inner saveMarkdown");
    console.assert(mockLogs.includes('showStatusMessage: "Page saved as Markdown.", isError: false'), "Test 1: Correct status message shown");
    global.document.createElement = originalDocCreateElement; // Restore


    mockLogs.push("--- Test 2: Save selection ---");
    global.document.title = "Selection Test Page";
    const selectedHTMLContent = "<div><span>Selected HTML for Test 2</span></div>";
    global.window.getSelection = () => ({
        toString: () => "selected text",
        getRangeAt: () => ({
            cloneContents: () => ({ outerHTML: selectedHTMLContent })
        })
    });
    global.TurndownServiceDefined = true;
    global.TurndownService = global.TurndownServiceDefaultMock;
    lastAnchorDownloadName = "";
    global.lastMarkdownContentForTest = "";
    global.lastFileNameForTest = "";
    mockAnchorCreation();

    save_markdown_outer_function();

    console.assert(mockLogs.includes(`TurndownService.turndown called with HTML: ${selectedHTMLContent}`), "Test 2: Turndown called with selected HTML");
    console.assert(global.lastMarkdownContentForTest === `markdown for: ${selectedHTMLContent}`, "Test 2: Correct markdown content for selection");
    console.assert(lastAnchorDownloadName === "Selection Test Page - selection.md", "Test 2: Downloaded filename for selection is correct");
    console.assert(global.lastFileNameForTest === "Selection Test Page - selection.md", "Test 2: Correct filename for selection");
    console.assert(mockLogs.includes('showStatusMessage: "Selection saved as Markdown.", isError: false'), "Test 2: Correct status message for selection shown");
    global.document.createElement = originalDocCreateElement; // Restore


    mockLogs.push("--- Test 3: TurndownService unavailable ---");
    const logsBeforeTest3Length = mockLogs.length; // Capture current log length

    global.TurndownServiceDefined = false;
    global.TurndownService = null;

    // This variable will track if the TurndownService constructor is called *during this test case*
    // by trying to replace the global.TurndownService function itself, if it's not null.
    // However, the primary guard in the tested code is `!global.TurndownServiceDefined || TurndownService === null`.
    // If this guard works, `new TurndownService()` is never called.
    // The original `turndownServiceConstructorCalledInTest3` logic was slightly flawed because
    // it modified `global.TurndownServiceDefaultMock` which is not the same as `global.TurndownService`.

    // For this test, we expect the initial guard to prevent `new TurndownService()`
    save_markdown_outer_function();

    const test3Logs = mockLogs.slice(logsBeforeTest3Length); // Get only logs from this test

    console.assert(test3Logs.some(log => log.includes("ALERT: TurndownService is not available. SAVE_MARKDOWN will not work.")), "Test 3: Alert shown");
    console.assert(test3Logs.some(log => log.includes('showStatusMessage: "TurndownService is not available.", isError: true')), "Test 3: Status message for unavailable");

    // Check that `new TurndownService()` wasn't successfully called and then its method `turndown()` invoked.
    // The most direct way is to check if the specific log from `turndown()` method is absent in test3Logs.
    console.assert(!test3Logs.some(log => log.includes("TurndownService.turndown called with HTML")), "Test 3: Turndown method should NOT be called in Test 3 logs");

    // Restore global state
    global.TurndownServiceDefined = true;
    global.TurndownService = global.TurndownServiceDefaultMock;

} catch (e) {
    mockLogs.push(`SCRIPT EXECUTION ERROR: ${e.name} - ${e.message} - ${e.stack}`);
} finally {
    // This structure ensures logs are printed even if errors occur during tests.
}

// --- Output Results ---
// This ensures all collected logs are printed to stdout for the tool to capture.
mockLogs.forEach(log => {
    process.stdout.write(log + '\n');
});

const failedAssertions = mockLogs.filter(log => log.startsWith("ASSERTION FAILED:"));
if (failedAssertions.length > 0) {
    process.stdout.write(`\n--- ${failedAssertions.length} ASSERTION(S) FAILED ---\n`);
    failedAssertions.forEach(fail => process.stdout.write(fail + '\n'));
} else {
    process.stdout.write("\n--- ALL ASSERTIONS PASSED ---\n");
}
