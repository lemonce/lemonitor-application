<template>
	<div>
		<h3>{{$t('label.about')}}&nbsp;{{product.name}}<small
			class="pull-right">{{$t('label.version')}}&nbsp;:&nbsp;{{product.version}}</small></h3>
		<hr>

		<div class="row">
			<div class="col-6">
				<h4>{{$t('label.authors')}}</h4>
				<p>{{product.author}}</p>
			</div>
		</div>

		<h4>{{$t('label.description')}}</h4>
		<p>{{product.description}}</p>

		<h4>{{$t('label.license')}}</h4>
		<pre id="app-license">{{product.license}}</pre>

		<h4>{{$t('about.server.hardware')}}</h4>
		<div class="row">
			<div class="col-md-8">
				<!-- <table class="table table-hover table-bordered">
					<thead>
						<tr>
							<th>{{$t('label.item')}}</th>
							<th>{{$t('label.value')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value, item) in env.os"
							:key="item">
							<td>{{item}}</td>
							<td>{{value}}</td>
						</tr>
					</tbody>
				</table> -->
				<el-table
					width="100%">
					<el-table-column
						prop="item"
						:label="$t('label.item')"
						width="">
					</el-table-column>
					<el-table-column
						prop="value"
						:label="$t('label.value')"
						width="">
					</el-table-column>
				</el-table>
				
			</div>
		</div>

		<h4>{{$t('about.server.software')}}</h4>
		<div class="row">
			<div class="col-8">
				<el-table width="100%">
					<el-table-column
						prop="item"
						:label="$t('label.product')">
					</el-table-column>
					<el-table-column
						prop="version"
						:label="$t('label.version')">
					</el-table-column>
				</el-table>

			</div>
		</div>

		<h4>{{$t('about.extensions.installed')}}</h4>
		<el-table width="100%">
			<el-table-column
				prop="name"
				:label="$t('label.name')">
			</el-table-column>
			<el-table-column
				prop="version"
				:label="$t('label.version')">
			</el-table-column>
			<el-table-column
				prop="license"
				:label="$t('label.license')">
			</el-table-column>
			<el-table-column
				prop="author"
				:label="$t('label.authors')">
			</el-table-column>
			<el-table-column
				prop="descrition"
				:label="$t('label.descrition')">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'maintance-about',
	data() {
		return {
			extensionList: {},
			env: this.$Data({
				start: 0,
				versions: {},
				os: {} //[TODO] type check failed for prop "data".Expected Array, got Object
			}, (http) => {
				return http.get('api/about/environment').then(res => {
					const { appStartTime, versions, os } = res.data.data;

					this.env.start = appStartTime;
					this.env.versions = versions;
					this.env.os = os;
				});
			}),
			product: this.$Data({
				name: '',
				author: '',
				version: '0.0.0',
				description: '',
				license: ''
			}, (http) => {
				http('api/about/meta').then(res => {
					Object.assign(this.product, res.data.data);
				});
			})
		}
	}
}
</script>

<style lang="less">
#app-license {
	width: 46em;
	height: 40em;
	overflow-y: auto;
}
</style>
