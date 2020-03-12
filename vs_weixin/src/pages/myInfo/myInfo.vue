<template>
	<div class="myInfo">
		<div class="top"></div>
		<div class="card">
			<div class="head"></div>
			<div class="username">比比比</div>
			<div class="content">
				<div class="left">
					个人信息
				</div>
				<div class="right">
					安全设置
				</div>
			</div>
		</div>
		<div class="bottom">

		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.myInfo {
	width: 100%;
	height: 100%;
	background: #fff;
	display: flex;
	flex-direction: column;
	position: relative;
	.card {
		color: #fff;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		top: 200upx;
		width: 80%;
		height: 140px;
		border-radius: 15upx;
		background: #5758BB;
		.head {
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			background: pink;
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}
		.username {
			text-align: center;
			margin-top: 80upx;
		}
		.content {
			margin-top: 40upx;
			display: flex;
			.left, .right {
				flex: 50%;
				background: ;
				text-align: center;
			}
		}
	}
	.top {
		width: 100%;
		height: 40%;
	}
	.bottom {
		width: 100%;
		height: 60%;
	}
}
</style>