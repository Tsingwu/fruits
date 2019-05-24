<template>
	<div class="fruit">
		<h1>fruits</h1>
		<div class="box">
			<input type="text" class="search" placeholder="请输入内容" v-model="keyword" @keyup.enter="addFruit" @keyup="search">
			<div class="result-box" :style="style">
				<ul class="result-list">
					<li v-for="(item, index) in resultList" :key="index">{{item.value}}</li>
				</ul>
			</div>
		</div>
		<div class="message-alert clearfix" :style="messageStyle">
			<i class="message-icon">i</i>
			<span class="message-txt">{{message}}</span>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'Fruits',
    data() {
      return {
        list: [],
        keyword: '',
        resultList: [],
        style: '',
        message: '',
        messageStyle: ''
      };
    },
    methods: {
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      loadAll() {
        return [
          {value: 'apple'},
          {value: 'orange'},
          {value: 'grape'}
        ];
      },
      addFruit() {
        if (this.resultList.length === 0){
          this.list.push({
            value: this.keyword.toLowerCase()
          });
          this.messageAlert('成功添加新水果');
        }
      },
      search(){
        let list = this.list;
        this.keyword = this.keyword.toLowerCase();
        this.resultList = this.keyword ? list.filter(this.createFilter(this.keyword)) : [];
      },
      messageAlert(message){
        this.message = message;
        this.messageStyle = `top:20px`;
        let _this = this;
        setTimeout(function () {
          _this.messageStyle = `top:-50px`;
        }, 3000);
      }
    },
    mounted() {
      this.list = this.loadAll();
    },
    watch: {
      resultList(){
        if (this.resultList.length > 0){
          this.style = `height:${((this.resultList.length * 34) + 32 >= 280) ? 280 : (this.resultList.length * 34) + 32}px;border: 1px solid #e4e7ed;`;
        }else{
          this.style = `height:0;border: 1px solid #ffffff;`;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	h3 {
		margin: 40px 0 0;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	a {
		color: #42b983;
	}
	
	input::-webkit-input-placeholder {
		color: #c0c4cc;
		font-size: 14px;
	}
	
	.clearfix:after {
		display: block;
		content:"";
		clear:both;
	}
	
	.box{
		position: relative;
		width: 202px;
		left: 50%;
		margin-left: -101px;
		
		@at-root .search {
			border-radius: 4px;
			border: 1px solid #DCDFE6;
			box-sizing: border-box;
			color: #606266;
			display: inline-block;
			width: 202px;
			height: 40px;
			outline: 0;
			padding: 0 15px;
		}
		
		@at-root .result-box{
			transition: all .3s;
			position: absolute;
			top: 45px;
			left: 0;
			width: 100%;
			height: 0;
			box-sizing: border-box;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
			overflow: hidden;
			
			@at-root .result-list{
				overflow-y: auto;
				
				li{
					text-align: left;
					padding: 0 15px;
					color: #606266;
					height: 34px;
					line-height: 34px;
					cursor: pointer;
					
					&:hover{
						background-color: #F5F7FA;
					}
				}
			}
		}
	}
	
	.message-alert{
		width: 380px;
		min-height: 48px;
		line-height: 48px;
		position: fixed;
		top: -50px;
		left: 50%;
		transition: all .5s;
		margin-left: -190px;
		background-color: #edf2fc;
		border-radius: 4px;
		z-index: 10000;
		padding: 0 22px;
		color: #909399;
		
		>.message-icon{
			float: left;
			display: inline-block;
			width: 16px;
			height: 16px;
			line-height: 16px;
			background-color: #909399;
			border-radius: 50%;
			color: #ffffff;
			margin: 16px;
			font-size: 12px;
		}
		
		>.message-txt{
			float: left;
		}
	}
</style>
