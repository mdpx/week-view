import {
    NAMESPACE
} from './constants'

export const CONTAINER = `<div class="${NAMESPACE}">
        <div class="${NAMESPACE}-header">
            <span class="${NAMESPACE}-prev">
                <svg height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </span>
            <span class="${NAMESPACE}-display"></span>
            <span class="${NAMESPACE}-next">
                <svg height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </span>
        </div>
        <div class="${NAMESPACE}-body"><ul></ul></div>
    </div>`

export const CELL = `<div class="${NAMESPACE}-cell">
        <div class="${NAMESPACE}-day">{0}</div>
        <div class="${NAMESPACE}-date">{1}</div>
    </div>`