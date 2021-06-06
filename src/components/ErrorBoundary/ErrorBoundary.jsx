// reference： https://github.com/bvaughn/react-error-boundary

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorBoundaryFallback from './ErrorBoundaryFallback';

class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    static propTypes = {
        onError: PropTypes.func,
        Fallback: PropTypes.func,
    };
    static defaultProps = {
        Fallback: ErrorBoundaryFallback,
    };

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            info: null,
        };
    }

    componentDidCatch(error, info) {
        const {onError} = this.props;
        if (typeof onError === 'function') {
            try {
                // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
                onError && onError.call(this, error, info ? info.componentStack : '');
            } catch (ignoredError) {
                // ignored error
            }
        }

        // You can also log the error to an error reporting service
        this.logErrorToMyService(error, info);
    }

    logErrorToMyService = (error, info) => {
        this.setState({
            error,
            info,
        });
    };

    render() {
        const {hasError, error, info} = this.state;
        const {children, Fallback} = this.props;

        // render fallback UI if there is error
        if (hasError || error !== null) {
            return (
                <Fallback
                    componentStack={
                        // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
                        info ? info.componentStack : ''
                    }
                    error={error}
                />
            );
        }

        return children || null;
    }
}

export default ErrorBoundary;
