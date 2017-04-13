(function() {
	//时间控件
	var date = {
		from: '',
		to: ''
	}

	function dateformat(time){
		function add0(m){return m<10?'0'+m:m }
		var date = new Date(time),
			y = date.getFullYear(),
			m = date.getMonth()+1,
			d = date.getDate(),
			h = date.getHours(),
			mm = date.getMinutes(),
			s = date.getSeconds();
		return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
	}

	function showTab() {
		var queryModel = {
			a_from: date.from,
			a_to: date.to,
			isProcessTime: $("input[name='isProcessTime']:checked").val(),
			queryDate: $('#queryDate').val(),
			queryStr: $('#queryStr').val(),
			querySpan: $('#querySpan').val()
		}
		var messenger = Messenger().post("检索中...");
		$.ajax({
			url: '/chart/query',
			method: 'POST',
			data: {queryModel: JSON.stringify(queryModel)},
			success: function(data) {
				if(data){
					messenger.update({
						message: '检索成功',
						hideAfter: 3,
						type: 'success'
					});
					$('#chartInfo').show();
					// $('#pivotTab').pivot(data,pivotUIOptions);
					var ecOpts = {
						title: {text: $('#title').val()},
						xAxis: {name: $('#xAxis_name').val()},
						yAxis: {name: $('#yAxis_name').val()}
					};
					$('#pivotTab').pivotUI(data,{},null,null,ecOpts);
				}else{
					messenger.update({
						message: '检索失败',
						hideAfter: 3,
						type: 'error'
					});
				}
			}
		});
	}

	function eventInit() {
		//初始化时间控件
		$('.date_from')
			.datetimepicker({
				language:  'zh-CN',
				weekStart: 1,
				todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				forceParse: 0,
				showMeridian: 1
			})
			.datetimepicker('update')
			.on('changeDate',function(ev) {
				date.from = ev.date.getTime();
			});
		$('.date_to')
			.datetimepicker({
				language:  'zh-CN',
				weekStart: 1,
				todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				forceParse: 0,
				showMeridian: 1
			})
			.datetimepicker('update')
			.on('changeDate',function(ev) {
				date.to = ev.date.getTime();
			});
		$('#query').click(function() {
			showTab();
		});
		$('#save').click(function() {

			var param = {
				creatTime: new Date(),
				queryModel: {
					a_from: date.from,
					a_to: date.to,
					isProcessTime: $("input[name='isProcessTime']:checked").val(),
					queryDate: $('#queryDate').val(),
					queryStr: $('#queryStr').val(),
					querySpan: $('#querySpan').val()
				},
				chartParam: {
					title: {text: $('#title').val()},
					xAxis: {name: $('#xAxis_name').val()},
					yAxis: {name: $('#yAxis_name').val()}
				},
				remark: $('#remark').val(),
				pivotParam: $('#pivotTab').data('pivotUIOptions')
			}
			var id = $(this).attr('_id');
			id ? param._id = id : '';
			$.ajax({
				url: '/chart/save',
				method: 'POST',
				data: {param:JSON.stringify(param)},
				success: function(data) {
					window.location.href="/chart/list";
				}
			});

		});
	}

	function pageInit() {
		var a_from = parseInt($('.date_from').attr('a_from'));
		var a_to = parseInt($('.date_to').attr('a_to'));
		if(a_from){
			date.from = a_from;
			$('.date_from input').val(dateformat(a_from));
		}
		if(a_to){
			date.to = a_to;
			$('.date_to input').val(dateformat(a_to));
		}
		var pivotUIOptions = $('#pivotTab').data('pivotUIOptions');
		if(pivotUIOptions){
			showTab();
		}
	}

	$(function () {
		eventInit();
		pageInit();
	})
})();