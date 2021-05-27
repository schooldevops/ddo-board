import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, numeric } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import BoardService from '@/entities/board/board.service';
import { IBoard } from '@/shared/model/board.model';

import { IPost, Post } from '@/shared/model/post.model';
import PostService from './post.service';

const validations: any = {
  post: {
    status: {
      required,
    },
    title: {
      required,
    },
    contents: {},
    readCnt: {},
    goodCnt: {},
    badCnt: {},
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
export default class PostUpdate extends mixins(JhiDataUtils) {
  @Inject('postService') private postService: () => PostService;
  public post: IPost = new Post();

  @Inject('boardService') private boardService: () => BoardService;

  public boards: IBoard[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.postId) {
        vm.retrievePost(to.params.postId);
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
    if (this.post.id) {
      this.postService()
        .update(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Post is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.postService()
        .create(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Post is created with identifier ' + param.id;
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
      this.post[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.post[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.post[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.post[field] = null;
    }
  }

  public retrievePost(postId): void {
    this.postService()
      .find(postId)
      .then(res => {
        res.createdAt = new Date(res.createdAt);
        res.modifiedAt = new Date(res.modifiedAt);
        this.post = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.boardService()
      .retrieve()
      .then(res => {
        this.boards = res.data;
      });
  }
}
