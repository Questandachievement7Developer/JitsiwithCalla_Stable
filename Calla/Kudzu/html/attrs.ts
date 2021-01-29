import { isBoolean, isHTMLElement } from "../typeChecks";

export interface IAppliable {
    apply(elem: HTMLElement | CSSStyleDeclaration): void;
}

/**
 * A setter functor for HTML attributes.
 **/
export class Attr implements IAppliable {
    readonly tags: readonly string[];
    /**
     * Creates a new setter functor for HTML Attributes
     * @param key - the attribute name.
     * @param value - the value to set for the attribute.
     * @param tags - the HTML tags that support this attribute.
     */
    constructor(
        public readonly key: string,
        public readonly value: any,
        ...tags: string[]) {
        this.tags = tags.map(t => t.toLocaleUpperCase());
        Object.freeze(this);
    }

    /**
     * Set the attribute value on an HTMLElement
     * @param elem - the element on which to set the attribute.
     */
    apply(elem: HTMLElement | CSSStyleDeclaration) {
        if (isHTMLElement(elem)) {
            const isValid = this.tags.length === 0
                || this.tags.indexOf(elem.tagName) > -1;

            if (!isValid) {
                console.warn(`Element ${elem.tagName} does not support Attribute ${this.key}`);
            }
            else if (this.key === "style") {
                Object.assign(elem.style, this.value);
            }
            else if (this.key in elem) {
                (elem as any)[this.key] = this.value;
            }
            else if (this.value === false) {
                elem.removeAttribute(this.key);
            }
            else if (this.value === true) {
                elem.setAttribute(this.key, "");
            }
            else {
                elem.setAttribute(this.key, this.value);
            }
        }
        else {
            (elem as any)[this.key] = this.value;
        }
    }
}


/**
 * a list of types the server accepts, typically a file type.
 * @param value - the value to set on the attribute.
 **/
export function accept(value: string) { return new Attr("accept", value, "form", "input"); }

/**
 * The accessKey attribute
 **/
export function accessKey(value: string) { return new Attr("accessKey", value, "input", "button"); }

/**
 * specifying the horizontal alignment of the element.
 **/
export function align(value: string) { return new Attr("align", value, "applet", "caption", "col", "colgroup", "hr", "iframe", "img", "table", "tbody", "td", "tfoot", "th", "thead", "tr"); }

/**
 * Specifies a feature-policy for the iframe.
 **/
export function allow(value: string) { return new Attr("allow", value, "iframe"); }

/**
 * Alternative text in case an image can't be displayed.
 **/
export function alt(value: string) { return new Attr("alt", value, "applet", "area", "img", "input"); }

/**
 * Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.
 **/
export function ariaActiveDescendant(value: string) { return new Attr("ariaActiveDescendant", value); }

/**
 * Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.
 **/
export function ariaAtomic(value: boolean) { return new Attr("ariaAtomic", value); }

/**
 * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.
 **/
export function ariaAutoComplete(value: string) { return new Attr("ariaAutoComplete", value); }

/**
 * Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.
 **/
export function ariaBusy(value: boolean) { return new Attr("ariaBusy", value); }

/**
 * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related aria-pressed and aria-selected.
 **/
export function ariaChecked(value: boolean) { return new Attr("ariaChecked", value); }

/**
 * Defines the total number of columns in a table, grid, or treegrid. See related aria-colindex.
  **/
export function ariaColCount(value: number) { return new Attr("ariaColCount", value); }

/**
 * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. See related aria-colcount and aria-colspan.
  **/
export function ariaColIndex(value: number) { return new Attr("ariaColIndex", value); }

/**
 * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-colindex and aria-rowspan.
  **/
export function ariaColSpan(value: number) { return new Attr("ariaColSpan", value); }

/**
 * Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.
  **/
export function ariaControls(value: string) { return new Attr("ariaControls", value); }

/**
 * Indicates the element that represents the current item within a container or set of related elements.
  **/
export function ariaCurrent(value: string) { return new Attr("ariaCurrent", value); }

/**
 * Identifies the element (or elements) that describes the object. See related aria-labelledby.
  **/
export function ariaDescribedBy(value: string) { return new Attr("ariaDescribedBy", value); }

/**
 * Identifies the element that provides a detailed, extended description for the object. See related aria-describedby.
  **/
export function ariaDetails(value: string) { return new Attr("ariaDetails", value); }

/**
 * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related aria-hidden and aria-readonly.
  **/
export function ariaDisabled(value: boolean) { return new Attr("ariaDisabled", value); }

/**
 * Identifies the element that provides an error message for the object. See related aria-invalid and aria-describedby.
  **/
export function ariaErrorMessage(value: string) { return new Attr("ariaErrorMessage", value); }

/**
 * Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
 **/
export function ariaExpanded(value: boolean) { return new Attr("ariaExpanded", value); }

/**
 * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.
  **/
export function ariaFlowTo(value: string) { return new Attr("ariaFlowTo", value); }

/**
 * Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.
  **/
export function ariaHasPopup(value: string) { return new Attr("ariaHasPopup", value); }

/**
 * Indicates whether the element is exposed to an accessibility API. See related aria-disabled.
 **/
export function ariaHidden(value: boolean) { return new Attr("ariaHidden", value); }

/**
 * Indicates the entered value does not conform to the format expected by the application. See related aria-errormessage.
  **/
export function ariaInvalid(value: string) { return new Attr("ariaInvalid", value); }

/**
 * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
  **/
export function ariaKeyShortcuts(value: string) { return new Attr("ariaKeyShortcuts", value); }

/**
 * Defines a string value that labels the current element. See related aria-labelledby.
  **/
export function ariaLabel(value: string) { return new Attr("ariaLabel", value); }

/**
 * Identifies the element (or elements) that labels the current element. See related aria-describedby.
  **/
export function ariaLabelledBy(value: string) { return new Attr("ariaLabelledBy", value); }

/**
 * Defines the hierarchical level of an element within a structure.
  **/
export function ariaLevel(value: number) { return new Attr("ariaLevel", value); }

/**
 * Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
  **/
export function ariaLive(value: string) { return new Attr("ariaLive", value); }

/**
 * Indicates whether an element is modal when displayed
  **/
export function ariaModal(value: boolean) { return new Attr("ariaModal", value); }

/**
 * Indicates whether a text box accepts multiple lines of input or only a single line.
  **/
export function ariaMultiline(value: boolean) { return new Attr("ariaMultiline", value); }

/**
 * Indicates that the user may select more than one item from the current selectable descendants.
  **/
export function ariaMultiSelectable(value: boolean) { return new Attr("ariaMultiSelectable", value); }

/**
 * Indicates that the user may select more than one item from the current selectable descendants.
  **/
export function ariaOrientation(value: string) { return new Attr("ariaOrientation", value); }

/**
 * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related aria-controls.
  **/
export function ariaOwns(value: string) { return new Attr("ariaOwns", value); }

/**
 * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.
  **/
export function ariaPlaceholder(value: string) { return new Attr("ariaPlaceholder", value); }

/**
 * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-setsize.
  **/
export function ariaPosInSet(value: number) { return new Attr("ariaPosInSet", value); }

/**
 * Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.
 **/
export function ariaPressed(value: boolean) { return new Attr("ariaPressed", value); }

/**
 * Indicates that the element is not editable, but is otherwise operable. See related aria-disabled.
  **/
export function ariaReadOnly(value: boolean) { return new Attr("ariaReadOnly", value); }

/**
 * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related aria-atomic.
  **/
export function ariaRelevant(value: string) { return new Attr("ariaRelevant", value); }

/**
 * Indicates that user input is required on the element before a form may be submitted.
  **/
export function ariaRequired(value: boolean) { return new Attr("ariaRequired", value); }

/**
 * Defines a human-readable, author-localized description for the role of an element.
  **/
export function ariaRoleDescription(value: string) { return new Attr("ariaRoleDescription", value); }

/**
 * Defines the total number of rows in a table, grid, or treegrid. See related aria-rowindex.
  **/
export function ariaRowCount(value: number) { return new Attr("ariaRowCount", value); }

/**
 * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. See related aria-rowcount and aria-rowspan.
  **/
export function ariaRowIndex(value: number) { return new Attr("ariaRowIndex", value); }

/**
 Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-rowindex and aria-colspan.
  **/
export function ariaRowSpan(value: number) { return new Attr("ariaRowSpan", value); }

/**
 * Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.
 **/
export function ariaSelected(value: boolean) { return new Attr("ariaSelected", value); }

/**
 * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-posinset.
  **/
export function ariaSetSize(value: number) { return new Attr("ariaSetsize", value); }

/**
 * Indicates if items in a table or grid are sorted in ascending or descending order.
  **/
export function ariaSort(value: string) { return new Attr("ariaSort", value); }

/**
 * Defines the maximum allowed value for a range widget.
  **/
export function ariaValueMax(value: number) { return new Attr("ariaValueMax", value); }

/**
 * Defines the minimum allowed value for a range widget.
  **/
export function ariaValueMin(value: number) { return new Attr("ariaValueMin", value); }

/**
 * Defines the current value for a range widget. See related aria-valuetext.
  **/
export function ariaValueNow(value: number) { return new Attr("ariaValueNow", value); }

/**
 * Defines the human readable text alternative of aria-valuenow for a range widget.
  **/
export function ariaValueText(value: string) { return new Attr("ariaValueText", value); }

/**
 * Executes the script asynchronously.
  **/
export function async(value: string) { return new Attr("async", value, "script"); }

/**
 * Sets whether input is automatically capitalized when entered by user
  **/
export function autoCapitalize(value: boolean) { return new Attr("autocapitalize", value); }

/**
 * Indicates whether controls in this form can by default have their values automatically completed by the browser.
  **/
export function autoComplete(value: boolean) { return new Attr("autocomplete", value, "form", "input", "select", "textarea"); }

/**
 * The element should be automatically focused after the page loaded.
  **/
export function autoFocus(value: boolean) { return new Attr("autofocus", value, "button", "input", "keygen", "select", "textarea"); }

/**
 * The audio or video should play as soon as possible.
  **/
export function autoPlay(value: boolean) { return new Attr("autoplay", value, "audio", "video"); }

/**
 * Contains the time range of already buffered media.
  **/
export function buffered(value: boolean) { return new Attr("buffered", value, "audio", "video"); }

/**
 * From the HTML Media Capture
  **/
export function capture(value: boolean) { return new Attr("capture", value, "input"); }

/**
 * Declares the character encoding of the page or script.
  **/
export function charSet(value: string) { return new Attr("charset", value, "meta", "script"); }

/**
 * Indicates whether the element should be checked on page load.
  **/
export function checked(value: boolean) { return new Attr("checked", value, "command", "input"); }

/**
 * Contains a URI which points to the source of the quote or change.
  **/
export function cite(value: string) { return new Attr("cite", value, "blockquote", "del", "ins", "q"); }

/**
 * Often used with CSS to style elements with common properties.
  **/
export function className(value: string) { return new Attr("className", value); }

/**
 * Specifies the URL of the applet's class file to be loaded and executed.
  **/
export function code(value: string) { return new Attr("code", value, "applet"); }

/**
 * This attribute gives the absolute or relative URL of the directory where applets' .class files referenced by the code attribute are stored.
  **/
export function codeBase(value: string) { return new Attr("codebase", value, "applet"); }

/**
 * Defines the number of columns in a textarea.
  **/
export function cols(value: number) { return new Attr("cols", value, "textarea"); }

/**
 * The colspan attribute defines the number of columns a cell should span.
  **/
export function colSpan(value: number) { return new Attr("colspan", value, "td", "th"); }

/**
 * A value associated with http-equiv or name depending on the context.
  **/
export function content(value: string) { return new Attr("content", value, "meta"); }

/**
 * Indicates whether the element's content is editable.
  **/
export function contentEditable(value: string) { return new Attr("contenteditable", value); }

/**
 * Defines the ID of a <menu> element which will serve as the element's context menu.
  **/
export function contextMenu(value: string) { return new Attr("contextmenu", value); }

/**
 * Indicates whether the browser should show playback controls to the user.
  **/
export function controls(value: boolean) { return new Attr("controls", value, "audio", "video"); }

/**
 * A set of values specifying the coordinates of the hot-spot region.
  **/
export function coords(value: string) { return new Attr("coords", value, "area"); }

/**
 * How the element handles cross-origin requests
  **/
export function crossOrigin(value: string) { return new Attr("crossorigin", value, "audio", "img", "link", "script", "video"); }

/**
 * Specifies the Content Security Policy that an embedded document must agree to enforce upon itself.
  **/
export function csp(value: string) { return new Attr("csp", value, "iframe"); }

/**
 * Specifies the URL of the resource.
  **/
export function data(value: string) { return new Attr("data", value, "object"); }

/**
 * Lets you attach custom attributes to an HTML element.
 */
export function customData(name: string, value: any) { return new Attr("data" + name, [], value); }

/**
 * Indicates the date and time associated with the element.
  **/
export function dateTime(value: Date) { return new Attr("datetime", value, "del", "ins", "time"); }

/**
 * Indicates the preferred method to decode the image.
  **/
export function decoding(value: string) { return new Attr("decoding", value, "img"); }

/**
 * Indicates that the track should be enabled unless the user's preferences indicate something different.
  **/
export function defaultValue(value: string) { return new Attr("default", value, "track"); }

/**
 * Indicates that the script should be executed after the page has been parsed.
  **/
export function defer(value: boolean) { return new Attr("defer", value, "script"); }

/**
 * Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)
  **/
export function dir(value: string) { return new Attr("dir", value); }

/**
 * Indicates whether the user can interact with the element.
  **/
export function disabled(value: boolean) { return new Attr("disabled", value, "button", "command", "fieldset", "input", "keygen", "optgroup", "option", "select", "textarea"); }

/**
 * ??? 
  **/
export function dirName(value: string) { return new Attr("dirname", value, "input", "textarea"); }

/**
 * Indicates that the hyperlink is to be used for downloading a resource.
  **/
export function download(value: boolean) { return new Attr("download", value, "a", "area"); }

/**
 * Defines whether the element can be dragged.
  **/
export function draggable(value: boolean) { return new Attr("draggable", value); }

/**
 * Indicates that the element accepts the dropping of content onto it.
  **/
export function dropZone(value: string) { return new Attr("dropzone", value); }

/**
 * Defines the content type of the form data when the method is POST.
  **/
export function encType(value: string) { return new Attr("enctype", value, "form"); }

/**
 * The enterkeyhint specifies what action label (or icon) to present for the enter key on virtual keyboards. The attribute can be used with form controls (such as the value of textarea elements), or in elements in an editing host (e.g., using contenteditable attribute).
  **/
export function enterKeyHint(value: string) { return new Attr("enterkeyhint", value, "textarea"); }

/**
 * Describes elements which belongs to this one.
  **/
export function htmlFor(value: string) { return new Attr("htmlFor", value, "label", "output"); }

/**
 * Indicates the form that is the owner of the element.
  **/
export function form(value: string) { return new Attr("form", value, "button", "fieldset", "input", "keygen", "label", "meter", "object", "output", "progress", "select", "textarea"); }

/**
 * Indicates the action of the element, overriding the action defined in the <form>.
  **/
export function formAction(value: string) { return new Attr("formaction", value, "input", "button"); }

/**
 * If the button/input is a submit button (type="submit"), this attribute sets the encoding type to use during form submission. If this attribute is specified, it overrides the enctype attribute of the button's form owner.
  **/
export function formEncType(value: string) { return new Attr("formenctype", value, "button", "input"); }

/**
 * If the button/input is a submit button (type="submit"), this attribute sets the submission method to use during form submission (GET, POST, etc.). If this attribute is specified, it overrides the method attribute of the button's form owner.
  **/
export function formMethod(value: string) { return new Attr("formmethod", value, "button", "input"); }

/**
 * If the button/input is a submit button (type="submit"), this boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the novalidate attribute of the button's form owner.
  **/
export function formNoValidate(value: boolean) { return new Attr("formnovalidate", value, "button", "input"); }

/**
 * If the button/input is a submit button (type="submit"), this attribute specifies the browsing context (for example, tab, window, or inline frame) in which to display the response that is received after submitting the form. If this attribute is specified, it overrides the target attribute of the button's form owner.
  **/
export function formTarget(value: string) { return new Attr("formtarget", value, "button", "input"); }

/**
 * IDs of the <th> elements which applies to this element.
  **/
export function headers(value: string) { return new Attr("headers", value, "td", "th"); }

/**
 * Specifies the height of elements listed here. For all other elements, use the CSS height property.
  **/
export function height(value: number|string) { return new Attr("height", value, "canvas", "embed", "iframe", "img", "input", "object", "video"); }

/**
 * Prevents rendering of given element, while keeping child elements, e.g. script elements, active.
  **/
export function hidden(value: boolean) { return new Attr("hidden", value); }

/**
 * Indicates the lower bound of the upper range.
  **/
export function high(value: number) { return new Attr("high", value, "meter"); }

/**
 * The URL of a linked resource.
  **/
export function href(value: string) { return new Attr("href", value, "a", "area", "base", "link"); }

/**
 * Specifies the language of the linked resource.
  **/
export function hrefLang(value: string) { return new Attr("hreflang", value, "a", "area", "link"); }

/**
 * Defines a pragma directive.
  **/
export function httpEquiv(value: string) { return new Attr("httpEquiv", value, "meta"); }

/**
 * Specifies a picture which represents the command.
  **/
export function icon(value: string) { return new Attr("icon", value, "command"); }

/**
 * Often used with CSS to style a specific element. The value of this attribute must be unique.
  **/
export function id(value: string) { return new Attr("id", value); }

/**
 * Indicates the relative fetch priority for the resource.
  **/
export function importance(value: string) { return new Attr("importance", value, "iframe", "img", "link", "script"); }

/**
 * Provides a hint as to the type of data that might be entered by the user while editing the element or its contents. The attribute can be used with form controls (such as the value of textarea elements), or in elements in an editing host (e.g., using contenteditable attribute).
  **/
export function inputMode(value: string) { return new Attr("inputmode", value, "textarea"); }

/**
 * Specifies a Subresource Integrity value that allows browsers to verify what they fetch.
  **/
export function integrity(value: string) { return new Attr("integrity", value, "link", "script"); }

/**
 * This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute.
  **/
export function intrinsicSize(value: string) { return new Attr("intrinsicsize", value, "img"); }

/**
 * Indicates that the image is part of a server-side image map.
  **/
export function isMap(value: boolean) { return new Attr("ismap", value, "img"); }

/**
 * Specifies the type of key generated.
  **/
export function keyType(value: string) { return new Attr("keytype", value, "keygen"); }

/**
 * The itemprop attribute
  **/
export function itemProp(value: string) { return new Attr("itemprop", value); }

/**
 * Specifies the kind of text track.
  **/
export function kind(value: string) { return new Attr("kind", value, "track"); }

/**
 * Specifies a user-readable title of the element.
  **/
export function label(value: string) { return new Attr("label", value, "optgroup", "option", "track"); }

/**
 * Defines the language used in the element.
  **/
export function lang(value: string) { return new Attr("lang", value); }

/**
 * Defines the script language used in the element.
  **/
export function language(value: string) { return new Attr("language", value, "script"); }

/**
 * Identifies a list of pre-defined options to suggest to the user.
  **/
export function list(value: string) { return new Attr("list", value, "input"); }

/**
 * Indicates whether the media should start playing from the start when it's finished.
  **/
export function loop(value: boolean) { return new Attr("loop", value, "audio", "bgsound", "marquee", "video"); }

/**
 * Indicates the upper bound of the lower range.
  **/
export function low(value: number) { return new Attr("low", value, "meter"); }

/**
 * Indicates the maximum value allowed.
  **/
export function max(value: number) { return new Attr("max", value, "input", "meter", "progress"); }

/**
 * Defines the maximum number of characters allowed in the element.
  **/
export function maxLength(value: number) { return new Attr("maxlength", value, "input", "textarea"); }

/**
 * Defines the minimum number of characters allowed in the element.
  **/
export function minLength(value: number) { return new Attr("minlength", value, "input", "textarea"); }

/**
 * Specifies a hint of the media for which the linked resource was designed.
  **/
export function media(value: string) { return new Attr("media", value, "a", "area", "link", "source", "style"); }

/**
 * Defines which HTTP method to use when submitting the form. Can be GET (default) or POST.
  **/
export function method(value: string) { return new Attr("method", value, "form"); }

/**
 * Indicates the minimum value allowed.
  **/
export function min(value: number) { return new Attr("min", value, "input", "meter"); }

/**
 * Indicates whether multiple values can be entered in an input of the type email or file.
  **/
export function multiple(value: boolean) { return new Attr("multiple", value, "input", "select"); }

/**
 * Indicates whether the audio will be initially silenced on page load.
  **/
export function muted(value: boolean) { return new Attr("muted", value, "audio", "video"); }

/**
 * Name of the element. For example used by the server to identify the fields in form submits.
  **/
export function name(value: string) { return new Attr("name", value, "button", "form", "fieldset", "iframe", "input", "keygen", "object", "output", "select", "textarea", "map", "meta", "param"); }

/**
 * This attribute indicates that the form shouldn't be validated when submitted.
  **/
export function noValidate(value: boolean) { return new Attr("novalidate", value, "form"); }

/**
 * Indicates whether the details will be shown on page load.
  **/
export function open(value: string) { return new Attr("open", value, "details"); }

/**
 * Indicates the optimal numeric value.
  **/
export function optimum(value: number) { return new Attr("optimum", value, "meter"); }

/**
 * Defines a regular expression which the element's value will be validated against.
  **/
export function pattern(value: string) { return new Attr("pattern", value, "input"); }

/**
 * The ping attribute specifies a space-separated list of URLs to be notified if a user follows the hyperlink.
  **/
export function ping(value: string) { return new Attr("ping", value, "a", "area"); }

/**
 * Provides a hint to the user of what can be entered in the field.
  **/
export function placeHolder(value: string) { return new Attr("placeholder", value, "input", "textarea"); }

/**
 * Indicates that the media element should play automatically on iOS.
  **/
export function playsInline(value: boolean) { return new Attr("playsInline", value, "audio", "video"); }

/**
 * A URL indicating a poster frame to show until the user plays or seeks.
  **/
export function poster(value: string) { return new Attr("poster", value, "video"); }

/**
 * Indicates whether the whole resource, parts of it or nothing should be preloaded.
  **/
export function preload(value: boolean) { return new Attr("preload", value, "audio", "video"); }

/**
 * Indicates whether the element can be edited.
  **/
export function readOnly(value: boolean) { return new Attr("readonly", value, "input", "textarea"); }

/**
 * The radiogroup attribute
  **/
export function radioGroup(value: string) { return new Attr("radiogroup", value, "command"); }

/**
 * Specifies which referrer is sent when fetching the resource.
  **/
export function referrerPolicy(value: string) { return new Attr("referrerpolicy", value, "a", "area", "iframe", "img", "link", "script"); }

/**
 * Specifies the relationship of the target object to the link object.
  **/
export function rel(value: string) { return new Attr("rel", value, "a", "area", "link"); }

/**
 * Indicates whether this element is required to fill out or not.
  **/
export function required(value: boolean) { return new Attr("required", value, "input", "select", "textarea"); }

/**
 * Indicates whether the list should be displayed in a descending order instead of a ascending.
  **/
export function reversed(value: boolean) { return new Attr("reversed", value, "ol"); }

/**
 * Defines the number of rows in a text area.
  **/
export function role(value: string) { return new Attr("role", value); }

/**
 * The rows attribute
  **/
export function rows(value: number) { return new Attr("rows", value, "textarea"); }

/**
 * Defines the number of rows a table cell should span over.
  **/
export function rowSpan(value: number) { return new Attr("rowspan", value, "td", "th"); }

/**
 * Stops a document loaded in an iframe from using certain features (such as submitting forms or opening new windows).
  **/
export function sandbox(value: string) { return new Attr("sandbox", value, "iframe"); }

/**
 * Defines the cells that the header test (defined in the th element) relates to.
  **/
export function scope(value: string) { return new Attr("scope", value, "th"); }

/**
 * The scoped attribute
  **/
export function scoped(value: boolean) { return new Attr("scoped", value, "style"); }

/**
 * Defines a value which will be selected on page load.
  **/
export function selected(value: boolean) { return new Attr("selected", value, "option"); }

/**
 * The shape attribute
  **/
export function shape(value: string) { return new Attr("shape", value, "a", "area"); }

/**
 * Defines the width of the element (in pixels). If the element's type attribute is text or password then it's the number of characters.
  **/
export function size(value: number) { return new Attr("size", value, "input", "select"); }

/**
 * Assigns a slot in a shadow DOM shadow tree to an element.
  **/
export function slot(value: string) { return new Attr("slot", value); }

/**
 * The sizes attribute
  **/
export function sizes(value: string) { return new Attr("sizes", value, "link", "img", "source"); }

/**
 * The span attribute
  **/
export function span(value: string) { return new Attr("span", value, "col", "colgroup"); }

/**
 * Indicates whether spell checking is allowed for the element.
  **/
export function spellCheck(value: boolean) { return new Attr("spellcheck", value); }

/**
 * The URL of the embeddable content.
  **/
export function src(value: string) { return new Attr("src", value, "audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"); }

/**
 * The srcdoc attribute
  **/
export function srcDoc(value: string) { return new Attr("srcdoc", value, "iframe"); }

/**
 * The srclang attribute
  **/
export function srcLang(value: string) { return new Attr("srclang", value, "track"); }

/**
 * A MediaStream object to use as a source for an HTML video or audio element
  **/
export function srcObject(value: MediaProvider) { return new Attr("srcObject", value, "audio", "video"); }

/**
 * One or more responsive image candidates.
  **/
export function srcSet(value: string) { return new Attr("srcset", value, "img", "source"); }

/**
 * Defines the first number if other than 1.
  **/
export function start(value: number) { return new Attr("start", value, "ol"); }

/**
 * Defines CSS styles which will override styles previously set.
 *
 * NOTE: DO NOT USE THIS. You should use `styles()` instead.
 **/
export function __deprecated__style__deprecated__(value: any) {
    for (let k in value) {
        if (!value[k] && !isBoolean(value[k])) {
            delete value[k];
        }
    }
    return new Attr("style", value);
}

/**
 * The step attribute
  **/
export function step(value: number) { return new Attr("step", value, "input"); }

/**
 * The summary attribute
  **/
export function summary(value: string) { return new Attr("summary", value, "table"); }

/**
 * Overrides the browser's default tab order and follows the one specified instead.
  **/
export function tabIndex(value: number) { return new Attr("tabindex", value); }

/**
 * Text to be displayed in a tooltip when hovering over the element.
  **/
export function title(value: string) { return new Attr("title", value); }

/**
 * The target attribute
  **/
export function target(value: string) { return new Attr("target", value, "a", "area", "base", "form"); }

/**
 * Specify whether an element’s attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.
  **/
export function translate(value: boolean) { return new Attr("translate", value); }

/**
 * Defines the type of the element.
  **/
export function type(value: string) { return new Attr("type", value, "button", "input", "command", "embed", "object", "script", "source", "style", "menu"); }

/**
 * Defines a default value which will be displayed in the element on page load.
  **/
export function value(value: string) { return new Attr("value", value, "button", "data", "input", "li", "meter", "option", "progress", "param"); }

/**
 * setting the volume at which a media element plays.
  **/
export function volume(value: number) { return new Attr("volume", value, "audio", "video"); }

/**
 * The usemap attribute
  **/
export function useMap(value: boolean) { return new Attr("usemap", value, "img", "input", "object"); }

/**
 * For the elements listed here, this establishes the element's width.
  **/
export function width(value: number|string) { return new Attr("width", value, "canvas", "embed", "iframe", "img", "input", "object", "video"); }

/**
 * Indicates whether the text should be wrapped.
  **/
export function wrap(value: boolean) { return new Attr("wrap", value, "textarea"); }

export class CssPropSet implements IAppliable {
    set: Map<string, string>;

    constructor(...rest: (Attr|CssPropSet)[]) {
        this.set = new Map<string, string>();
        const set = (key: string, value: string) => {
            if (value || isBoolean(value)) {
                this.set.set(key, value);
            }
            else if (this.set.has(key)) {
                this.set.delete(key);
            }
        };
        for (const prop of rest) {
            if (prop instanceof Attr) {
                const { key, value } = prop;
                set(key, value);
            }
            else {
                for (const [key, value] of prop.set.entries()) {
                    set(key, value);
                }
            }
        }
    }

    /**
     * Set the attribute value on an HTMLElement
     * @param elem - the element on which to set the attribute.
     */
    apply(elem: HTMLElement | CSSStyleDeclaration) {
        const style = isHTMLElement(elem)
            ? elem.style
            : elem;

        for (const prop of this.set.entries()) {
            const [key, value] = prop;
            (style as any)[key] = value;
        }
    }
}

/**
 * Combine style properties.
 **/
export function styles(...rest: (Attr|CssPropSet)[]) {
    return new CssPropSet(...rest);
}

export function alignContent(v: string) { return new Attr("alignContent", v); }
export function alignItems(v: string) { return new Attr("alignItems", v); }
export function alignSelf(v: string) { return new Attr("alignSelf", v); }
export function alignmentBaseline(v: string) { return new Attr("alignmentBaseline", v); }
export function all(v: string) { return new Attr("all", v); }
export function animation(v: string) { return new Attr("animation", v); }
export function animationDelay(v: string) { return new Attr("animationDelay", v); }
export function animationDirection(v: string) { return new Attr("animationDirection", v); }
export function animationDuration(v: string) { return new Attr("animationDuration", v); }
export function animationFillMode(v: string) { return new Attr("animationFillMode", v); }
export function animationIterationCount(v: string) { return new Attr("animationIterationCount", v); }
export function animationName(v: string) { return new Attr("animationName", v); }
export function animationPlayState(v: string) { return new Attr("animationPlayState", v); }
export function animationTimingFunction(v: string) { return new Attr("animationTimingFunction", v); }
export function appearance(v: string) { return new Attr("appearance", v); }
export function backdropFilter(v: string) { return new Attr("backdropFilter", v); }
export function backfaceVisibility(v: string) { return new Attr("backfaceVisibility", v); }
export function background(v: string) { return new Attr("background", v); }
export function backgroundAttachment(v: string) { return new Attr("backgroundAttachment", v); }
export function backgroundBlendMode(v: string) { return new Attr("backgroundBlendMode", v); }
export function backgroundClip(v: string) { return new Attr("backgroundClip", v); }
export function backgroundColor(v: string) { return new Attr("backgroundColor", v); }
export function backgroundImage(v: string) { return new Attr("backgroundImage", v); }
export function backgroundOrigin(v: string) { return new Attr("backgroundOrigin", v); }
export function backgroundPosition(v: string) { return new Attr("backgroundPosition", v); }
export function backgroundPositionX(v: string) { return new Attr("backgroundPositionX", v); }
export function backgroundPositionY(v: string) { return new Attr("backgroundPositionY", v); }
export function backgroundRepeat(v: string) { return new Attr("backgroundRepeat", v); }
export function backgroundRepeatX(v: string) { return new Attr("backgroundRepeatX", v); }
export function backgroundRepeatY(v: string) { return new Attr("backgroundRepeatY", v); }
export function backgroundSize(v: string) { return new Attr("backgroundSize", v); }
export function baselineShift(v: string) { return new Attr("baselineShift", v); }
export function blockSize(v: string) { return new Attr("blockSize", v); }
export function border(v: string) { return new Attr("border", v); }
export function borderBlockEnd(v: string) { return new Attr("borderBlockEnd", v); }
export function borderBlockEndColor(v: string) { return new Attr("borderBlockEndColor", v); }
export function borderBlockEndStyle(v: string) { return new Attr("borderBlockEndStyle", v); }
export function borderBlockEndWidth(v: string) { return new Attr("borderBlockEndWidth", v); }
export function borderBlockStart(v: string) { return new Attr("borderBlockStart", v); }
export function borderBlockStartColor(v: string) { return new Attr("borderBlockStartColor", v); }
export function borderBlockStartStyle(v: string) { return new Attr("borderBlockStartStyle", v); }
export function borderBlockStartWidth(v: string) { return new Attr("borderBlockStartWidth", v); }
export function borderBottom(v: string) { return new Attr("borderBottom", v); }
export function borderBottomColor(v: string) { return new Attr("borderBottomColor", v); }
export function borderBottomLeftRadius(v: string) { return new Attr("borderBottomLeftRadius", v); }
export function borderBottomRightRadius(v: string) { return new Attr("borderBottomRightRadius", v); }
export function borderBottomStyle(v: string) { return new Attr("borderBottomStyle", v); }
export function borderBottomWidth(v: string) { return new Attr("borderBottomWidth", v); }
export function borderCollapse(v: string) { return new Attr("borderCollapse", v); }
export function borderColor(v: string) { return new Attr("borderColor", v); }
export function borderImage(v: string) { return new Attr("borderImage", v); }
export function borderImageOutset(v: string) { return new Attr("borderImageOutset", v); }
export function borderImageRepeat(v: string) { return new Attr("borderImageRepeat", v); }
export function borderImageSlice(v: string) { return new Attr("borderImageSlice", v); }
export function borderImageSource(v: string) { return new Attr("borderImageSource", v); }
export function borderImageWidth(v: string) { return new Attr("borderImageWidth", v); }
export function borderInlineEnd(v: string) { return new Attr("borderInlineEnd", v); }
export function borderInlineEndColor(v: string) { return new Attr("borderInlineEndColor", v); }
export function borderInlineEndStyle(v: string) { return new Attr("borderInlineEndStyle", v); }
export function borderInlineEndWidth(v: string) { return new Attr("borderInlineEndWidth", v); }
export function borderInlineStart(v: string) { return new Attr("borderInlineStart", v); }
export function borderInlineStartColor(v: string) { return new Attr("borderInlineStartColor", v); }
export function borderInlineStartStyle(v: string) { return new Attr("borderInlineStartStyle", v); }
export function borderInlineStartWidth(v: string) { return new Attr("borderInlineStartWidth", v); }
export function borderLeft(v: string) { return new Attr("borderLeft", v); }
export function borderLeftColor(v: string) { return new Attr("borderLeftColor", v); }
export function borderLeftStyle(v: string) { return new Attr("borderLeftStyle", v); }
export function borderLeftWidth(v: string) { return new Attr("borderLeftWidth", v); }
export function borderRadius(v: string) { return new Attr("borderRadius", v); }
export function borderRight(v: string) { return new Attr("borderRight", v); }
export function borderRightColor(v: string) { return new Attr("borderRightColor", v); }
export function borderRightStyle(v: string) { return new Attr("borderRightStyle", v); }
export function borderRightWidth(v: string) { return new Attr("borderRightWidth", v); }
export function borderSpacing(v: string) { return new Attr("borderSpacing", v); }
export function borderStyle(v: string) { return new Attr("borderStyle", v); }
export function borderTop(v: string) { return new Attr("borderTop", v); }
export function borderTopColor(v: string) { return new Attr("borderTopColor", v); }
export function borderTopLeftRadius(v: string) { return new Attr("borderTopLeftRadius", v); }
export function borderTopRightRadius(v: string) { return new Attr("borderTopRightRadius", v); }
export function borderTopStyle(v: string) { return new Attr("borderTopStyle", v); }
export function borderTopWidth(v: string) { return new Attr("borderTopWidth", v); }
export function borderWidth(v: string) { return new Attr("borderWidth", v); }
export function bottom(v: string) { return new Attr("bottom", v); }
export function boxShadow(v: string) { return new Attr("boxShadow", v); }
export function boxSizing(v: string) { return new Attr("boxSizing", v); }
export function breakAfter(v: string) { return new Attr("breakAfter", v); }
export function breakBefore(v: string) { return new Attr("breakBefore", v); }
export function breakInside(v: string) { return new Attr("breakInside", v); }
export function bufferedRendering(v: string) { return new Attr("bufferedRendering", v); }
export function captionSide(v: string) { return new Attr("captionSide", v); }
export function caretColor(v: string) { return new Attr("caretColor", v); }
export function clear(v: string) { return new Attr("clear", v); }
export function clip(v: string) { return new Attr("clip", v); }
export function clipPath(v: string) { return new Attr("clipPath", v); }
export function clipRule(v: string) { return new Attr("clipRule", v); }
export function color(v: string) { return new Attr("color", v); }
export function colorInterpolation(v: string) { return new Attr("colorInterpolation", v); }
export function colorInterpolationFilters(v: string) { return new Attr("colorInterpolationFilters", v); }
export function colorRendering(v: string) { return new Attr("colorRendering", v); }
export function colorScheme(v: string) { return new Attr("colorScheme", v); }
export function columnCount(v: string) { return new Attr("columnCount", v); }
export function columnFill(v: string) { return new Attr("columnFill", v); }
export function columnGap(v: string) { return new Attr("columnGap", v); }
export function columnRule(v: string) { return new Attr("columnRule", v); }
export function columnRuleColor(v: string) { return new Attr("columnRuleColor", v); }
export function columnRuleStyle(v: string) { return new Attr("columnRuleStyle", v); }
export function columnRuleWidth(v: string) { return new Attr("columnRuleWidth", v); }
export function columnSpan(v: string) { return new Attr("columnSpan", v); }
export function columnWidth(v: string) { return new Attr("columnWidth", v); }
export function columns(v: string) { return new Attr("columns", v); }
export function contain(v: string) { return new Attr("contain", v); }
export function containIntrinsicSize(v: string) { return new Attr("containIntrinsicSize", v); }
export function counterIncrement(v: string) { return new Attr("counterIncrement", v); }
export function counterReset(v: string) { return new Attr("counterReset", v); }
export function cursor(v: string) { return new Attr("cursor", v); }
export function cx(v: string) { return new Attr("cx", v); }
export function cy(v: string) { return new Attr("cy", v); }
export function d(v: string) { return new Attr("d", v); }
export function direction(v: string) { return new Attr("direction", v); }
export function display(v: string) { return new Attr("display", v); }
export function dominantBaseline(v: string) { return new Attr("dominantBaseline", v); }
export function emptyCells(v: string) { return new Attr("emptyCells", v); }
export function fill(v: string) { return new Attr("fill", v); }
export function fillOpacity(v: string) { return new Attr("fillOpacity", v); }
export function fillRule(v: string) { return new Attr("fillRule", v); }
export function filter(v: string) { return new Attr("filter", v); }
export function flex(v: string) { return new Attr("flex", v); }
export function flexBasis(v: string) { return new Attr("flexBasis", v); }
export function flexDirection(v: string) { return new Attr("flexDirection", v); }
export function flexFlow(v: string) { return new Attr("flexFlow", v); }
export function flexGrow(v: string) { return new Attr("flexGrow", v); }
export function flexShrink(v: string) { return new Attr("flexShrink", v); }
export function flexWrap(v: string) { return new Attr("flexWrap", v); }
export function float(v: string) { return new Attr("float", v); }
export function floodColor(v: string) { return new Attr("floodColor", v); }
export function floodOpacity(v: string) { return new Attr("floodOpacity", v); }
export function font(v: string) { return new Attr("font", v); }
export function fontDisplay(v: string) { return new Attr("fontDisplay", v); }
export function fontFamily(v: string) { return new Attr("fontFamily", v); }
export function fontFeatureSettings(v: string) { return new Attr("fontFeatureSettings", v); }
export function fontKerning(v: string) { return new Attr("fontKerning", v); }
export function fontOpticalSizing(v: string) { return new Attr("fontOpticalSizing", v); }
export function fontSize(v: string) { return new Attr("fontSize", v); }
export function fontStretch(v: string) { return new Attr("fontStretch", v); }
export function fontStyle(v: string) { return new Attr("fontStyle", v); }
export function fontVariant(v: string) { return new Attr("fontVariant", v); }
export function fontVariantCaps(v: string) { return new Attr("fontVariantCaps", v); }
export function fontVariantEastAsian(v: string) { return new Attr("fontVariantEastAsian", v); }
export function fontVariantLigatures(v: string) { return new Attr("fontVariantLigatures", v); }
export function fontVariantNumeric(v: string) { return new Attr("fontVariantNumeric", v); }
export function fontVariationSettings(v: string) { return new Attr("fontVariationSettings", v); }
export function fontWeight(v: string) { return new Attr("fontWeight", v); }
export function forcedColorAdjust(v: string) { return new Attr("forcedColorAdjust", v); }
export function gap(v: string) { return new Attr("gap", v); }
export function grid(v: string) { return new Attr("grid", v); }
export function gridArea(v: string) { return new Attr("gridArea", v); }
export function gridAutoColumns(v: string) { return new Attr("gridAutoColumns", v); }
export function gridAutoFlow(v: string) { return new Attr("gridAutoFlow", v); }
export function gridAutoRows(v: string) { return new Attr("gridAutoRows", v); }
export function gridColumn(v: string) { return new Attr("gridColumn", v); }
export function gridColumnEnd(v: string) { return new Attr("gridColumnEnd", v); }
export function gridColumnGap(v: string) { return new Attr("gridColumnGap", v); }
export function gridColumnStart(v: string) { return new Attr("gridColumnStart", v); }
export function gridGap(v: string) { return new Attr("gridGap", v); }
export function gridRow(v: string) { return new Attr("gridRow", v); }
export function gridRowEnd(v: string) { return new Attr("gridRowEnd", v); }
export function gridRowGap(v: string) { return new Attr("gridRowGap", v); }
export function gridRowStart(v: string) { return new Attr("gridRowStart", v); }
export function gridTemplate(v: string) { return new Attr("gridTemplate", v); }
export function gridTemplateAreas(v: string) { return new Attr("gridTemplateAreas", v); }
export function gridTemplateColumns(v: string) { return new Attr("gridTemplateColumns", v); }
export function gridTemplateRows(v: string) { return new Attr("gridTemplateRows", v); }
export function hyphens(v: string) { return new Attr("hyphens", v); }
export function imageOrientation(v: string) { return new Attr("imageOrientation", v); }
export function imageRendering(v: string) { return new Attr("imageRendering", v); }
export function inlineSize(v: string) { return new Attr("inlineSize", v); }
export function isolation(v: string) { return new Attr("isolation", v); }
export function justifyContent(v: string) { return new Attr("justifyContent", v); }
export function justifyItems(v: string) { return new Attr("justifyItems", v); }
export function justifySelf(v: string) { return new Attr("justifySelf", v); }
export function left(v: string) { return new Attr("left", v); }
export function letterSpacing(v: string) { return new Attr("letterSpacing", v); }
export function lightingColor(v: string) { return new Attr("lightingColor", v); }
export function lineBreak(v: string) { return new Attr("lineBreak", v); }
export function lineHeight(v: string) { return new Attr("lineHeight", v); }
export function listStyle(v: string) { return new Attr("listStyle", v); }
export function listStyleImage(v: string) { return new Attr("listStyleImage", v); }
export function listStylePosition(v: string) { return new Attr("listStylePosition", v); }
export function listStyleType(v: string) { return new Attr("listStyleType", v); }
export function margin(v: string) { return new Attr("margin", v); }
export function marginBlockEnd(v: string) { return new Attr("marginBlockEnd", v); }
export function marginBlockStart(v: string) { return new Attr("marginBlockStart", v); }
export function marginBottom(v: string) { return new Attr("marginBottom", v); }
export function marginInlineEnd(v: string) { return new Attr("marginInlineEnd", v); }
export function marginInlineStart(v: string) { return new Attr("marginInlineStart", v); }
export function marginLeft(v: string) { return new Attr("marginLeft", v); }
export function marginRight(v: string) { return new Attr("marginRight", v); }
export function marginTop(v: string) { return new Attr("marginTop", v); }
export function marker(v: string) { return new Attr("marker", v); }
export function markerEnd(v: string) { return new Attr("markerEnd", v); }
export function markerMid(v: string) { return new Attr("markerMid", v); }
export function markerStart(v: string) { return new Attr("markerStart", v); }
export function mask(v: string) { return new Attr("mask", v); }
export function maskType(v: string) { return new Attr("maskType", v); }
export function maxBlockSize(v: string) { return new Attr("maxBlockSize", v); }
export function maxHeight(v: string) { return new Attr("maxHeight", v); }
export function maxInlineSize(v: string) { return new Attr("maxInlineSize", v); }
export function maxWidth(v: string) { return new Attr("maxWidth", v); }
export function maxZoom(v: string) { return new Attr("maxZoom", v); }
export function minBlockSize(v: string) { return new Attr("minBlockSize", v); }
export function minHeight(v: string) { return new Attr("minHeight", v); }
export function minInlineSize(v: string) { return new Attr("minInlineSize", v); }
export function minWidth(v: string) { return new Attr("minWidth", v); }
export function minZoom(v: string) { return new Attr("minZoom", v); }
export function mixBlendMode(v: string) { return new Attr("mixBlendMode", v); }
export function objectFit(v: string) { return new Attr("objectFit", v); }
export function objectPosition(v: string) { return new Attr("objectPosition", v); }
export function offset(v: string) { return new Attr("offset", v); }
export function offsetDistance(v: string) { return new Attr("offsetDistance", v); }
export function offsetPath(v: string) { return new Attr("offsetPath", v); }
export function offsetRotate(v: string) { return new Attr("offsetRotate", v); }
export function opacity(v: string) { return new Attr("opacity", v); }
export function order(v: string) { return new Attr("order", v); }
export function orientation(v: string) { return new Attr("orientation", v); }
export function orphans(v: string) { return new Attr("orphans", v); }
export function outline(v: string) { return new Attr("outline", v); }
export function outlineColor(v: string) { return new Attr("outlineColor", v); }
export function outlineOffset(v: string) { return new Attr("outlineOffset", v); }
export function outlineStyle(v: string) { return new Attr("outlineStyle", v); }
export function outlineWidth(v: string) { return new Attr("outlineWidth", v); }
export function overflow(v: string) { return new Attr("overflow", v); }
export function overflowAnchor(v: string) { return new Attr("overflowAnchor", v); }
export function overflowWrap(v: string) { return new Attr("overflowWrap", v); }
export function overflowX(v: string) { return new Attr("overflowX", v); }
export function overflowY(v: string) { return new Attr("overflowY", v); }
export function overscrollBehavior(v: string) { return new Attr("overscrollBehavior", v); }
export function overscrollBehaviorBlock(v: string) { return new Attr("overscrollBehaviorBlock", v); }
export function overscrollBehaviorInline(v: string) { return new Attr("overscrollBehaviorInline", v); }
export function overscrollBehaviorX(v: string) { return new Attr("overscrollBehaviorX", v); }
export function overscrollBehaviorY(v: string) { return new Attr("overscrollBehaviorY", v); }
export function padding(v: string) { return new Attr("padding", v); }
export function paddingBlockEnd(v: string) { return new Attr("paddingBlockEnd", v); }
export function paddingBlockStart(v: string) { return new Attr("paddingBlockStart", v); }
export function paddingBottom(v: string) { return new Attr("paddingBottom", v); }
export function paddingInlineEnd(v: string) { return new Attr("paddingInlineEnd", v); }
export function paddingInlineStart(v: string) { return new Attr("paddingInlineStart", v); }
export function paddingLeft(v: string) { return new Attr("paddingLeft", v); }
export function paddingRight(v: string) { return new Attr("paddingRight", v); }
export function paddingTop(v: string) { return new Attr("paddingTop", v); }
export function pageBreakAfter(v: string) { return new Attr("pageBreakAfter", v); }
export function pageBreakBefore(v: string) { return new Attr("pageBreakBefore", v); }
export function pageBreakInside(v: string) { return new Attr("pageBreakInside", v); }
export function paintOrder(v: string) { return new Attr("paintOrder", v); }
export function perspective(v: string) { return new Attr("perspective", v); }
export function perspectiveOrigin(v: string) { return new Attr("perspectiveOrigin", v); }
export function placeContent(v: string) { return new Attr("placeContent", v); }
export function placeItems(v: string) { return new Attr("placeItems", v); }
export function placeSelf(v: string) { return new Attr("placeSelf", v); }
export function pointerEvents(v: string) { return new Attr("pointerEvents", v); }
export function position(v: string) { return new Attr("position", v); }
export function quotes(v: string) { return new Attr("quotes", v); }
export function r(v: string) { return new Attr("r", v); }
export function resize(v: string) { return new Attr("resize", v); }
export function right(v: string) { return new Attr("right", v); }
export function rowGap(v: string) { return new Attr("rowGap", v); }
export function rubyPosition(v: string) { return new Attr("rubyPosition", v); }
export function rx(v: string) { return new Attr("rx", v); }
export function ry(v: string) { return new Attr("ry", v); }
export function scrollBehavior(v: string) { return new Attr("scrollBehavior", v); }
export function scrollMargin(v: string) { return new Attr("scrollMargin", v); }
export function scrollMarginBlock(v: string) { return new Attr("scrollMarginBlock", v); }
export function scrollMarginBlockEnd(v: string) { return new Attr("scrollMarginBlockEnd", v); }
export function scrollMarginBlockStart(v: string) { return new Attr("scrollMarginBlockStart", v); }
export function scrollMarginBottom(v: string) { return new Attr("scrollMarginBottom", v); }
export function scrollMarginInline(v: string) { return new Attr("scrollMarginInline", v); }
export function scrollMarginInlineEnd(v: string) { return new Attr("scrollMarginInlineEnd", v); }
export function scrollMarginInlineStart(v: string) { return new Attr("scrollMarginInlineStart", v); }
export function scrollMarginLeft(v: string) { return new Attr("scrollMarginLeft", v); }
export function scrollMarginRight(v: string) { return new Attr("scrollMarginRight", v); }
export function scrollMarginTop(v: string) { return new Attr("scrollMarginTop", v); }
export function scrollPadding(v: string) { return new Attr("scrollPadding", v); }
export function scrollPaddingBlock(v: string) { return new Attr("scrollPaddingBlock", v); }
export function scrollPaddingBlockEnd(v: string) { return new Attr("scrollPaddingBlockEnd", v); }
export function scrollPaddingBlockStart(v: string) { return new Attr("scrollPaddingBlockStart", v); }
export function scrollPaddingBottom(v: string) { return new Attr("scrollPaddingBottom", v); }
export function scrollPaddingInline(v: string) { return new Attr("scrollPaddingInline", v); }
export function scrollPaddingInlineEnd(v: string) { return new Attr("scrollPaddingInlineEnd", v); }
export function scrollPaddingInlineStart(v: string) { return new Attr("scrollPaddingInlineStart", v); }
export function scrollPaddingLeft(v: string) { return new Attr("scrollPaddingLeft", v); }
export function scrollPaddingRight(v: string) { return new Attr("scrollPaddingRight", v); }
export function scrollPaddingTop(v: string) { return new Attr("scrollPaddingTop", v); }
export function scrollSnapAlign(v: string) { return new Attr("scrollSnapAlign", v); }
export function scrollSnapStop(v: string) { return new Attr("scrollSnapStop", v); }
export function scrollSnapType(v: string) { return new Attr("scrollSnapType", v); }
export function shapeImageThreshold(v: string) { return new Attr("shapeImageThreshold", v); }
export function shapeMargin(v: string) { return new Attr("shapeMargin", v); }
export function shapeOutside(v: string) { return new Attr("shapeOutside", v); }
export function shapeRendering(v: string) { return new Attr("shapeRendering", v); }
export function speak(v: string) { return new Attr("speak", v); }
export function stopColor(v: string) { return new Attr("stopColor", v); }
export function stopOpacity(v: string) { return new Attr("stopOpacity", v); }
export function stroke(v: string) { return new Attr("stroke", v); }
export function strokeDasharray(v: string) { return new Attr("strokeDasharray", v); }
export function strokeDashoffset(v: string) { return new Attr("strokeDashoffset", v); }
export function strokeLinecap(v: string) { return new Attr("strokeLinecap", v); }
export function strokeLinejoin(v: string) { return new Attr("strokeLinejoin", v); }
export function strokeMiterlimit(v: string) { return new Attr("strokeMiterlimit", v); }
export function strokeOpacity(v: string) { return new Attr("strokeOpacity", v); }
export function strokeWidth(v: string) { return new Attr("strokeWidth", v); }
export function tabSize(v: string) { return new Attr("tabSize", v); }
export function tableLayout(v: string) { return new Attr("tableLayout", v); }
export function textAlign(v: string) { return new Attr("textAlign", v); }
export function textAlignLast(v: string) { return new Attr("textAlignLast", v); }
export function textAnchor(v: string) { return new Attr("textAnchor", v); }
export function textCombineUpright(v: string) { return new Attr("textCombineUpright", v); }
export function textDecoration(v: string) { return new Attr("textDecoration", v); }
export function textDecorationColor(v: string) { return new Attr("textDecorationColor", v); }
export function textDecorationLine(v: string) { return new Attr("textDecorationLine", v); }
export function textDecorationSkipInk(v: string) { return new Attr("textDecorationSkipInk", v); }
export function textDecorationStyle(v: string) { return new Attr("textDecorationStyle", v); }
export function textIndent(v: string) { return new Attr("textIndent", v); }
export function textOrientation(v: string) { return new Attr("textOrientation", v); }
export function textOverflow(v: string) { return new Attr("textOverflow", v); }
export function textRendering(v: string) { return new Attr("textRendering", v); }
export function textShadow(v: string) { return new Attr("textShadow", v); }
export function textSizeAdjust(v: string) { return new Attr("textSizeAdjust", v); }
export function textTransform(v: string) { return new Attr("textTransform", v); }
export function textUnderlinePosition(v: string) { return new Attr("textUnderlinePosition", v); }
export function top(v: string) { return new Attr("top", v); }
export function touchAction(v: string) { return new Attr("touchAction", v); }
export function transform(v: string) { return new Attr("transform", v); }
export function transformBox(v: string) { return new Attr("transformBox", v); }
export function transformOrigin(v: string) { return new Attr("transformOrigin", v); }
export function transformStyle(v: string) { return new Attr("transformStyle", v); }
export function transition(v: string) { return new Attr("transition", v); }
export function transitionDelay(v: string) { return new Attr("transitionDelay", v); }
export function transitionDuration(v: string) { return new Attr("transitionDuration", v); }
export function transitionProperty(v: string) { return new Attr("transitionProperty", v); }
export function transitionTimingFunction(v: string) { return new Attr("transitionTimingFunction", v); }
export function unicodeBidi(v: string) { return new Attr("unicodeBidi", v); }
export function unicodeRange(v: string) { return new Attr("unicodeRange", v); }
export function userSelect(v: string) { return new Attr("userSelect", v); }
export function userZoom(v: string) { return new Attr("userZoom", v); }
export function vectorEffect(v: string) { return new Attr("vectorEffect", v); }
export function verticalAlign(v: string) { return new Attr("verticalAlign", v); }
export function visibility(v: string) { return new Attr("visibility", v); }
export function whiteSpace(v: string) { return new Attr("whiteSpace", v); }
export function widows(v: string) { return new Attr("widows", v); }
export function willChange(v: string) { return new Attr("willChange", v); }
export function wordBreak(v: string) { return new Attr("wordBreak", v); }
export function wordSpacing(v: string) { return new Attr("wordSpacing", v); }
export function wordWrap(v: string) { return new Attr("wordWrap", v); }
export function writingMode(v: string) { return new Attr("writingMode", v); }
export function x(v: string) { return new Attr("x", v); }
export function y(v: string) { return new Attr("y", v); }
export function zIndex(v: number) { return new Attr("zIndex", v); }
export function zoom(v: number) { return new Attr("zoom", v); }


/**
 * A selection of fonts for preferred monospace rendering.
 **/
export function getMonospaceFonts() {
    return "'Droid Sans Mono', 'Consolas', 'Lucida Console', 'Courier New', 'Courier', monospace";
}

/**
 * A selection of fonts for preferred monospace rendering.
 **/
export function getMonospaceFamily() {
    return fontFamily(getMonospaceFonts());
}

/**
 * A selection of fonts that should match whatever the user's operating system normally uses.
 **/
export function getSystemFonts() {
    return "-apple-system, '.SFNSText-Regular', 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif";
}

/**
 * A selection of fonts that should match whatever the user's operating system normally uses.
 **/
export function getSystemFamily() {
    return fontFamily(getSystemFonts());
}