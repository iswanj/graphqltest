import "babel-polyfill";
import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import request from 'superagent';

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/theme/github';

class Main extends React.Component{
    constructor() {
        super();

        this.state = {
            result: ''
        }
        this.query = {};
    }

    handleRequest() {
        let ev = this;

        if(this.query !== ''){
            request
              .post('http://localhost:3000/data')
              .query({
                query: `${this.query}`
              })
              .end(function (err, res) {
                let stResult = err || JSON.stringify(res.body.data, undefined, 2)
                ev.setState({
                    result: stResult.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;")
                }, () => {
                    ev.refs.editor.value = this.query;
                });
              });
        }
    }

    handleChange(newValue) {
        this.query = newValue;
    }

	render() {
        let handleRequest = (e) => { this.handleRequest(e); };
        let handleChange = (newValue) => { this.handleChange(newValue); };
		const styles = {
            container: {
                width: '100%',
                height: '100vh'
            },
            queryEditor: {
                width: '50%',
                height: '100vh',
                float: 'left',
                borderRight: '1px solid #ccc'
            },
            resultViewer: {
                width: '50%',
                height: '100vh',
                overflowY: 'auto',
                float: 'right',
                color: '#666',
                fontFamily: 'verdana',
                fontSize: '.7em',
                padding: '1em',
                lineHeight: '1.2222'
            },
            submitController: {
                height: '10vh',
                width: '100%',
                backgroundColor: '#ccc',
                padding: '1.1em 1em'
            },
            button: {
                fontFamily: 'Arial',
                border: '1px solid #b83130',
                background: '#cb3837',
                color: '#fff',
                padding: '.6em 1.2em',
                lineHeight: 1.222,
                fontWeight: 'bold',
                float: 'right',
                cursor: 'pointer'
            }
		};

        let { result } = this.state;
        let displayResult = () => {
            return {__html: result};
        }
		return (
            <div style={styles.container}>
    			<div style={styles.queryEditor}>
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        height="90vh"
                        width="100%"
                        onChange={handleChange}
                        name="Editor"
                        ref="editor"
                    />
                    <div style={styles.submitController}>
                        <button type="button" style={styles.button} onClick={handleRequest}>Submit</button>
                    </div>
                </div>
                <div style={styles.resultViewer} dangerouslySetInnerHTML={displayResult()}>
                </div>
            </div>
		)
	}
};

export default Main;
