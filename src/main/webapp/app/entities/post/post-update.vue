<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="ddoboardApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">Create or edit a Post</h2>
        <div>
          <div class="form-group" v-if="post.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="post.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-status">Status</label>
            <input
              type="text"
              class="form-control"
              name="status"
              id="post-status"
              data-cy="status"
              :class="{ valid: !$v.post.status.$invalid, invalid: $v.post.status.$invalid }"
              v-model="$v.post.status.$model"
              required
            />
            <div v-if="$v.post.status.$anyDirty && $v.post.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.post.status.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="post-title"
              data-cy="title"
              :class="{ valid: !$v.post.title.$invalid, invalid: $v.post.title.$invalid }"
              v-model="$v.post.title.$model"
              required
            />
            <div v-if="$v.post.title.$anyDirty && $v.post.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.post.title.required"> This field is required. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-contents">Contents</label>
            <div>
              <div v-if="post.contents" class="form-text text-danger clearfix">
                <a class="pull-left" v-on:click="openFile(post.contentsContentType, post.contents)">open</a><br />
                <span class="pull-left">{{ post.contentsContentType }}, {{ byteSize(post.contents) }}</span>
                <button
                  type="button"
                  v-on:click="
                    post.contents = null;
                    post.contentsContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_contents"
                id="file_contents"
                data-cy="contents"
                v-on:change="setFileData($event, post, 'contents', false)"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="contents"
              id="post-contents"
              data-cy="contents"
              :class="{ valid: !$v.post.contents.$invalid, invalid: $v.post.contents.$invalid }"
              v-model="$v.post.contents.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="contentsContentType"
              id="post-contentsContentType"
              v-model="post.contentsContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-readCnt">Read Cnt</label>
            <input
              type="number"
              class="form-control"
              name="readCnt"
              id="post-readCnt"
              data-cy="readCnt"
              :class="{ valid: !$v.post.readCnt.$invalid, invalid: $v.post.readCnt.$invalid }"
              v-model.number="$v.post.readCnt.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-goodCnt">Good Cnt</label>
            <input
              type="number"
              class="form-control"
              name="goodCnt"
              id="post-goodCnt"
              data-cy="goodCnt"
              :class="{ valid: !$v.post.goodCnt.$invalid, invalid: $v.post.goodCnt.$invalid }"
              v-model.number="$v.post.goodCnt.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-badCnt">Bad Cnt</label>
            <input
              type="number"
              class="form-control"
              name="badCnt"
              id="post-badCnt"
              data-cy="badCnt"
              :class="{ valid: !$v.post.badCnt.$invalid, invalid: $v.post.badCnt.$invalid }"
              v-model.number="$v.post.badCnt.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-createdAt">Created At</label>
            <div class="d-flex">
              <input
                id="post-createdAt"
                data-cy="createdAt"
                type="datetime-local"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.post.createdAt.$invalid, invalid: $v.post.createdAt.$invalid }"
                required
                :value="convertDateTimeFromServer($v.post.createdAt.$model)"
                @change="updateZonedDateTimeField('createdAt', $event)"
              />
            </div>
            <div v-if="$v.post.createdAt.$anyDirty && $v.post.createdAt.$invalid">
              <small class="form-text text-danger" v-if="!$v.post.createdAt.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.post.createdAt.ZonedDateTimelocal">
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-createdBy">Created By</label>
            <input
              type="number"
              class="form-control"
              name="createdBy"
              id="post-createdBy"
              data-cy="createdBy"
              :class="{ valid: !$v.post.createdBy.$invalid, invalid: $v.post.createdBy.$invalid }"
              v-model.number="$v.post.createdBy.$model"
              required
            />
            <div v-if="$v.post.createdBy.$anyDirty && $v.post.createdBy.$invalid">
              <small class="form-text text-danger" v-if="!$v.post.createdBy.required"> This field is required. </small>
              <small class="form-text text-danger" v-if="!$v.post.createdBy.numeric"> This field should be a number. </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-modifiedAt">Modified At</label>
            <div class="d-flex">
              <input
                id="post-modifiedAt"
                data-cy="modifiedAt"
                type="datetime-local"
                class="form-control"
                name="modifiedAt"
                :class="{ valid: !$v.post.modifiedAt.$invalid, invalid: $v.post.modifiedAt.$invalid }"
                :value="convertDateTimeFromServer($v.post.modifiedAt.$model)"
                @change="updateZonedDateTimeField('modifiedAt', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-modifiedBy">Modified By</label>
            <input
              type="number"
              class="form-control"
              name="modifiedBy"
              id="post-modifiedBy"
              data-cy="modifiedBy"
              :class="{ valid: !$v.post.modifiedBy.$invalid, invalid: $v.post.modifiedBy.$invalid }"
              v-model.number="$v.post.modifiedBy.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="post-board">Board</label>
            <select class="form-control" id="post-board" data-cy="board" name="board" v-model="post.board">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="post.board && boardOption.id === post.board.id ? post.board : boardOption"
                v-for="boardOption in boards"
                :key="boardOption.id"
              >
                {{ boardOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.post.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./post-update.component.ts"></script>
