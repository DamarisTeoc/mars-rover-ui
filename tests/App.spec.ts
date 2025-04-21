/// <reference types="vitest" />
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue', () => {
  it('executes commands and displays the result', async () => {
    const wrapper = mount(App)

    // Find the input and set a command sequence
    const input = wrapper.find('input')
    await input.setValue('FFRFF')

    // Click the execute button
    await wrapper.find('button').trigger('click')

    // Expect final position and direction to be rendered
    expect(wrapper.text()).toContain('Final Position')
    expect(wrapper.text()).toContain('Final Direction')
  })
})