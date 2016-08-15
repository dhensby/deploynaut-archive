var ReactRedux = require('react-redux');

var actions = require('../../_actions.js');
var Button = require('../../components/Button.jsx');

const mapStateToProps = function(state) {
	return {
		disabled: state.git.is_fetching || state.approval.request_sent,
		style: "btn-default",
		value: state.git.is_fetching ? "Updating code..." : "Update code"
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		onClick: function() {
			dispatch(actions.updateGit());
		}
	};
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Button);