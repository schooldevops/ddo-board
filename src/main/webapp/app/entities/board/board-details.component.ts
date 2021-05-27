import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBoard } from '@/shared/model/board.model';
import BoardService from './board.service';

@Component
export default class BoardDetails extends Vue {
  @Inject('boardService') private boardService: () => BoardService;
  public board: IBoard = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boardId) {
        vm.retrieveBoard(to.params.boardId);
      }
    });
  }

  public retrieveBoard(boardId) {
    this.boardService()
      .find(boardId)
      .then(res => {
        this.board = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
