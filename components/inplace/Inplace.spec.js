import { config, mount } from '@vue/test-utils';
import InputText from 'primevue/inputtext';
import Inplace from './Inplace.vue';

config.global.mocks = {
    $primevue: {
        config: {
            locale: {
                aria: {
                    close: 'Close'
                }
            }
        }
    }
};

describe('Inplace.vue', () => {
    it('should exist', () => {
        const wrapper = mount(Inplace);

        expect(wrapper.find('.p-inplace.p-component').exists()).toBe(true);
    });

    it('should slots display', () => {
        const wrapper = mount(Inplace, {
            global: {
                components: {
                    InputText
                }
            },
            slots: {
                display: `
                    <span class="pi pi-search" style="vertical-align: middle"></span>
                    <span style="margin-left:.5rem; vertical-align: middle">View Picture</span>
                `,
                content: `<img src="https://primefaces.org/cdn/primevue/images/nature/nature1.jpg" />`
            }
        });

        expect(wrapper.find('.p-inplace-display').exists()).toBe(true);

        wrapper.vm.open({});

        expect(wrapper.emitted()['update:active'][0]).toEqual([true]);

        wrapper.vm.close({});

        expect(wrapper.emitted()['update:active'][1]).toEqual([false]);
    });

    it('closable inplace', async () => {
        const wrapper = mount(Inplace, {
            global: {
                components: {
                    InputText
                }
            },
            props: {
                closable: true
            },
            slots: {
                display: `{{'Click to Edit'}}`,
                content: `<InputText autoFocus />`
            }
        });

        expect(wrapper.find('.p-inplace-closable').exists()).toBe(true);
        expect(wrapper.find('.p-inplace-display').text()).toBe('Click to Edit');

        await wrapper.vm.open({});

        expect(wrapper.find('.p-inputtext').exists()).toBe(true);
        expect(wrapper.find('.pi.pi-times').exists()).toBe(true);

        await wrapper.vm.close({});

        expect(wrapper.find('.pi.pi-times').exists()).toBe(false);
    });

    it('should have custom close icon', async () => {
        const wrapper = mount(Inplace, {
            global: {
                components: {
                    InputText
                }
            },
            props: {
                closable: true,
                closeIcon: 'pi pi-discord'
            },
            slots: {
                display: `{{'Click to Edit'}}`,
                content: `<InputText autoFocus />`
            }
        });

        await wrapper.vm.open({});

        expect(wrapper.find('.pi.pi-discord').exists()).toBe(true);
    });
});
