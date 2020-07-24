<template>
  <div class="hello">
    <h1>快来写上你的愿望吧！</h1>
    <div
      v-for="card in cards"
      :key="card.id"
      class="card"
      :style="{ 'backgroundColor': card.color }"
    >
      <div>
        <el-row class="card-top">
          <el-col :span="6">
            <el-avatar v-if="card.icon" class="card-avatar" :icon="card.icon"></el-avatar>
            <el-avatar v-else class="card-avatar" :src="card.photo"></el-avatar>
          </el-col>
          <el-col :span="18">
            <span class="card-name">{{ card.name }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="card-wish">
        <span class="card-wish-context">{{ card.wish }}</span>
      </div>
      <div class="card-bottom">
        <el-button class="card-closebtn" type="text" @click="closeCard(card.id)">关闭</el-button>
      </div>
    </div>

    <div>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-input v-model="name" placeholder="说出你的大名"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 5px;">
        <el-col :span="2">
          <el-button
            :type="type === 1?'success': ''"
            @click="selectAvatar('el-icon-user-solid', 1)"
          >
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button :type="type === 2?'success': ''" @click="selectAvatar('el-icon-star-on', 2)">
            <el-avatar icon="el-icon-star-on"></el-avatar>
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            :type="type === 3?'success': ''"
            @click="selectAvatar('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 3)"
          >
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </el-button>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 5px;">
        <el-col :span="6">
          <el-input type="textarea" :rows="3" v-model="wish" placeholder="许个愿吧"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row type="flex" justify="center">
        <el-col :span="6" style="backgroundColor: #409EFF;">
          <el-button type="primary" @click="submit">提 交</el-button>
        </el-col>
      </el-row>

      <br />
    </div>
  </div>
</template>

<script>
import { sample, remove, startsWith } from "lodash";
import { submit as login, getWishList } from "../api.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      name: "",
      wish: "",
      photo: "",
      type: "",
      cards: [
        {
          id: 1,
          name: "小李小李",
          wish: "我希望身体健康！1111111231111111",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
        {
          id: 2,
          name: "小李小李2",
          wish: "我希望身体健康！1111111231111111",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        },
      ],
      colorList: [
        "green",
        "gray",
        "#ff0000",
        "pink",
        "yellow",
        "blue",
        "orange",
      ],
    };
  },
  created() {
    this.getCards();
  },
  methods: {
    selectAvatar(value, type) {
      this.photo = value;
      this.type = type;
    },
    submit() {
      if (this.name.trim() === "") {
        this.$message({
          showClose: true,
          message: "留下您的称呼",
          type: "warning",
        });
      } else {
        if (this.wish.trim() === "") {
          this.$message({
            showClose: true,
            message: "许下您的愿望",
            type: "warning",
          });
        } else {
          login({ name: this.name, wish: this.wish, photo: this.photo })
            .then((res) => {
              this.$router.push({
                name: "result",
                params: { msg: "添加成功，返回去看一下" },
              });
            })
            .catch((e) => {
              this.$router.push({
                name: "result",
                params: { msg: "添加失败，返回去看一下" },
              });
            });
          this.name = "";
          this.wish = "";
          this.photo = "";
          this.type = "";
        }
      }
    },
    closeCard(id) {
      this.cards = remove(this.cards, (item) => item.id !== id);
    },
    getCards() {
      getWishList()
        .then((res) => {
          if (res && res.data) {
            this.cards = res.data.data;
            this.cards.forEach((item) => {
              item.wish = item.wishes;
              if (startsWith(item.photo, 'el')) {
                item.icon = item.photo;
              }
            });
          }
          this.cards.forEach((item) => {
            item.color = sample(this.colorList);
          });
        })
        .catch((e) => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: #f5f5f5;
}
li {
  list-style: none;
}
.card {
  height: 250px;
  width: 200px;
  margin: 10px;
  display: inline-block;
}
.card-wish {
  margin-top: 10px;
  height: 160px;
}
.divider {
  margin: 5px;
}
.card-avatar {
  margin-top: 5px;
}
.card-wish-context {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.card-name {
  font-size: 16px;
  padding-right: 70px;
}
.card-closebtn {
  padding: 0px;
  color: black;
}
.card-bottom {
  text-align: right;
  padding-right: 10px;
  font-size: 13px;
}
.card-top {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
