import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAttach } from '@/shared/model/attach.model';
import AttachService from './attach.service';

@Component
export default class AttachDetails extends Vue {
  @Inject('attachService') private attachService: () => AttachService;
  public attach: IAttach = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.attachId) {
        vm.retrieveAttach(to.params.attachId);
      }
    });
  }

  public retrieveAttach(attachId) {
    this.attachService()
      .find(attachId)
      .then(res => {
        this.attach = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
