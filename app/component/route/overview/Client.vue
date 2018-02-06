<template>
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('flag.client')}}</li>
		</ol>
	</nav>

	<h3>{{$t('flag.client')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">
			<div class="input-group mb-3">
				<input type="text"
					class="form-control"
					:placeholder="$t('flag.selectClient')">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>

		</div>
	</div>

	<div class="row">
		<div class="col-10">
			<table class="table table-bordered flag-list">
				<thead>
					<tr>
						<th style="width:14rem">{{$t('flag.time')}}</th>
						<th>{{$t('flag.clientCode')}}</th>
						<th style="width:14rem">{{$t('flag.ip')}}</th>
						<th style="width:42rem">{{$t('flag.ua')}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>01/12/2018 17:46:18</td>
						<td>534568.160e9c34cba</td>
						<td>127.0.0.1</td>
						<td>Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'flag-client',
	data() {
		return {
			clientFlagList: null
		};
	}
}
</script>

<style lang="less">
.table.flag-list {
	th,
	td {
		text-align: center;
		vertical-align: middle;
	}
}
</style>
