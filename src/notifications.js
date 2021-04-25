const template = document.createElement('template')
template.innerHTML = `
  <div
    x-data="$el.parentElement.data()"
    x-init="handleInit()"
    x-cloak
    aria-live="assertive"
    class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    @show-notify.window="handleShow($event)"
  >
    <div
      x-show="show"
      class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      x-transition:enter="transform ease-out duration-300 transition"
      x-transition:enter-start="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      x-transition:enter-end="translate-y-0 opacity-100 sm:translate-x-0"
      x-transition:leave="transition ease-in duration-100"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900" x-text="title"></p>
            <p class="mt-1 text-sm text-gray-500" x-text="body"></p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              @click="show = !show"
            >
              <span class="sr-only">Close</span>
              <!-- Heroicon name: solid/x -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`

export class notifications extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true))
  }

  data() {
    return {
      show: false,
      title: 'This is Title!',
      body: 'This is message body!',
      delay: Number(this.getAttribute('delay')) ?? 3000,
      handleInit() {
        const { delay } = this
        this.$watch('show', val => {
          if (val && delay) {
            setTimeout(() => {
              this.show = false
            }, delay)
          }
        })
      },
      handleShow(event) {
        const { show, title, body, delay } = event.detail
        this.show = show
        this.title = title ?? this.title
        this.body = body ?? this.body
        this.delay = delay ?? this.delay
      },
    }
  }
}

customElements.define('tw-notifications', notifications)
