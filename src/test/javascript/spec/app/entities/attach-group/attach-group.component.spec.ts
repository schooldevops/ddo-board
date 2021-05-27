/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AttachGroupComponent from '@/entities/attach-group/attach-group.vue';
import AttachGroupClass from '@/entities/attach-group/attach-group.component';
import AttachGroupService from '@/entities/attach-group/attach-group.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('AttachGroup Management Component', () => {
    let wrapper: Wrapper<AttachGroupClass>;
    let comp: AttachGroupClass;
    let attachGroupServiceStub: SinonStubbedInstance<AttachGroupService>;

    beforeEach(() => {
      attachGroupServiceStub = sinon.createStubInstance<AttachGroupService>(AttachGroupService);
      attachGroupServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<AttachGroupClass>(AttachGroupComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          attachGroupService: () => attachGroupServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      attachGroupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllAttachGroups();
      await comp.$nextTick();

      // THEN
      expect(attachGroupServiceStub.retrieve.called).toBeTruthy();
      expect(comp.attachGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      attachGroupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(attachGroupServiceStub.retrieve.called).toBeTruthy();
      expect(comp.attachGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      attachGroupServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(attachGroupServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      attachGroupServiceStub.retrieve.reset();
      attachGroupServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(attachGroupServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.attachGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      attachGroupServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeAttachGroup();
      await comp.$nextTick();

      // THEN
      expect(attachGroupServiceStub.delete.called).toBeTruthy();
      expect(attachGroupServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
