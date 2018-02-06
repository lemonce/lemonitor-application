<template>
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/flag/client">{{$t('flag.client')}}</router-link>
			</li>
			<li class="breadcrumb-item active">
				{{$t('flag.userOfClient')}}: <strong>clientFlag</strong>...
			</li>
		</ol>
	</nav>

	<h3>{{$t('flag.user')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">
			<div class="input-group mb-3">
				<input type="text"
					class="form-control"
					:placeholder="$t('flag.selectUser')">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>

		</div>
	</div>

	<div class="row">
		<div class="col-8">
			<table class="table table-bordered flag-list">
				<thead>
					<tr>
						<th style="width: 14rem">{{$t('flag.time')}}</th>
						<th style="width: 14rem">{{$t('flag.userCode')}}</th>
						<th>{{$t('flag.domain')}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>01/12/2018 17:46:18</td>
						<td>csfadfsadfg</td>
						<td>www.baidu.com</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			
		</div>
	</div>
</div>
</template>
