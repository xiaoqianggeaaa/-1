module.exports = function(_status,_data,_mess){
	return {status: _status == undefined ? true : _status, data: _data || [], message: _mess || ''};
}
