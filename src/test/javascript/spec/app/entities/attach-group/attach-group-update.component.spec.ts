/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import AttachGroupUpdateComponent from '@/entities/attach-group/attach-group-update.vue';
import AttachGroupClass from '@/entities/attach-group/attach-group-update.component';
import AttachGroupService from '@/entities/attach-group/attach-group.service';

import PostService from '@/entities/post/post.service';

import AttachService from '@/entities/attach/attach.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('AttachGroup Management Update Component', () => {
    let wrapper: Wrapper<AttachGroupClass>;
    let comp: AttachGroupClass;
    let attachGroupServiceStub: SinonStubbedInstance<AttachGroupService>;

    beforeEach(() => {
      attachGroupServiceStub = sinon.createStubInstance<AttachGroupService>(AttachGroupService);

      wrapper = shallowMount<AttachGroupClass>(AttachGroupUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          attachGroupService: () => attachGroupServiceStub,

          postService: () => new PostService(),

          attachService: () => new AttachService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.attachGroup = entity;
        attachGroupServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(attachGroupServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.attachGroup = entity;
        attachGroupServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(attachGroupServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundAttachGroup = { id: 123 };
        attachGroupServiceStub.find.resolves(foundAttachGroup);
        attachGroupServiceStub.retrieve.resolves([foundAttachGroup]);

        // WHEN
        comp.beforeRouteEnter({ params: { attachGroupId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.attachGroup).toBe(foundAttachGroup);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
