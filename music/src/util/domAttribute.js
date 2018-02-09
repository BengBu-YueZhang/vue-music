export function setDataAttribute (dom, key, value) {
    dom.setAttribute(`data-${key}`, value)
}

export function getDataAttribute (dom, key) {
    return dom.getAttribute(`data-${key}`)
}