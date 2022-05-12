import React from "react"
import {bindActionCreators} from "redux";
import {compose} from "../../utils";
import {connect} from "react-redux";

import {setPushToState, removePushFromState} from "../../redux/reports/reports.utils"
import {withApiService} from "../../hoc";

import classes from './Push.module.scss'

const Push = ({ alerts, removePush }) => {
    return (
        <div className={classes.alerts}>
            {alerts.length > 0 && alerts.map(({ id, text, type }) => (
                <div className={`${classes.alert} ${classes['alert-' + type]}`} key={id}>
                    <span>{text}</span>
                    <i className={`${classes.icon} ${classes['icon-' + type]}`} onClick={() => removePush(id)()} />
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = ({ reports: { alerts } }) => {
    return { alerts }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setPush: (text, type, timeout) => setPushToState(text, type, timeout),
        removePush: (id) => removePushFromState(id)
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Push)
