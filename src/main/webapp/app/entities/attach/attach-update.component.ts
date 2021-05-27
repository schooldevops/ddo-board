import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AttachGroupService from '@/entities/attach-group/attach-group.service';
import { IAttachGroup } from '@/shared/model/attach-group.model';

import { IAttach, Attach } from '@/shared/model/attach.model';
import AttachService from './attach.service';

const validations: any = {
  attach: {
    ord: {},
    name: {},
    origName: {},
    ext: {},
    contentType: {},
    path: {},
    fileSize: {},
    createdAt: {
      required,
    },
    createdBy: {
      required,
      numeric,
    },
    modifiedAt: {},
    modifiedBy: {},
  },
};

@Component({
  validations,
})
export default class AttachUpdate extends Vue {
  @Inject('attachService') private attachService: () => AttachService;
  public attach: IAttach = new Attach();

  @Inject('attachGroupService') private attachGroupService: () => AttachGroupService;

  public attachGroups: IAttachGroup[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.attachId) {
        vm.retrieveAttach(to.params.attachId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.attach.id) {
      this.attachService()
        .update(this.attach)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Attach is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.attachService()
        .create(this.attach)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Attach is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.attach[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.attach[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.attach[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.attach[field] = null;
    }
  }

  public retrieveAttach(attachId): void {
    this.attachService()
      .find(attachId)
      .then(res => {
        res.createdAt = new Date(res.createdAt);
        res.modifiedAt = new Date(res.modifiedAt);
        this.attach = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.attachGroupService()
      .retrieve()
      .then(res => {
        this.attachGroups = res.data;
      });
  }
}
