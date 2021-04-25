const template = document.createElement('template')
template.innerHTML = `
  <button
    x-data="$el.parentElement.data()"
    x-cloak
    :type="type"
    x-text="text"
    class="inline-flex items-center border border-gray-300 shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :class="{
      'px-6 py-3 text-base rounded-md': size === 'base',
      'px-4 py-2 text-sm rounded-md': size === 'sm',
      'px-2.5 py-1.5 text-xs rounded': size === 'xs',
    }"
    @say-hello="text = $event.detail.text"
  >
  </button>
`

export class button extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true))
  }

  data() {
    return {
      text: this.getAttribute('text') ?? 'button',
      type: this.getAttribute('type') ?? 'button',
      size: this.getAttribute('size') ?? 'base',
    }
  }
}

customElements.define('tw-btn', button)
