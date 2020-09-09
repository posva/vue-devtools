import { setupDevtoolsPlugin } from '@vue/devtools-api'

/** @type {import('@vue/devtools-api').DevtoolsPluginApi} */
let devtoolsApi

export default {
  install: (app) => {
    setupDevtoolsPlugin({
      id: 'test-plugin',
      label: 'Test devtools plugin',
      app
    }, (api) => {
      devtoolsApi = api

      let time = 0

      api.on.inspectComponent((payload, ctx) => {
        if (payload.instanceData) {
          const stateType = 'extra properties (test)'
          payload.instanceData.state.push({
            type: stateType,
            key: 'foo',
            value: 'bar'
          })
          payload.instanceData.state.push({
            type: stateType,
            key: 'time',
            value: {
              _custom: {
                type: null,
                readOnly: true,
                display: `${time}s`,
                tooltip: 'Elapsed time',
                value: time
              }
            }
          })
        }
      })

      setInterval(() => {
        time += 5
        // Update component
        api.notifyComponentUpdate()
        // Update custom inspector
        api.sendInspectorTree('test-inspector')
        api.sendInspectorState('test-inspector')
      }, 5000)

      api.addTimelineLayer({
        id: 'test-layer',
        label: 'Test layer',
        color: 0x92A2BF
      })

      api.addInspector({
        id: 'test-inspector',
        label: 'Test inspector',
        icon: 'tab_unselected',
        treeFilterPlaceholder: 'Search for test...'
      })

      api.addInspector({
        id: 'test-inspector2',
        label: 'Test inspector 2'
      })

      api.on.getInspectorTree(payload => {
        if (payload.app === app && payload.inspectorId === 'test-inspector') {
          payload.rootNodes = [
            {
              id: 'root',
              label: `Root (${time})`,
              children: [
                {
                  id: 'child',
                  label: `Child ${payload.filter}`,
                  tags: [
                    {
                      label: 'active',
                      textColor: 0x000000,
                      backgroundColor: 0xFF984F
                    },
                    {
                      label: 'test',
                      textColor: 0xffffff,
                      backgroundColor: 0x000000
                    }
                  ]
                }
              ]
            }
          ]
        }
      })

      api.on.getInspectorState(payload => {
        if (payload.app === app && payload.inspectorId === 'test-inspector') {
          if (payload.nodeId === 'root') {
            payload.state = {
              'root info': [
                {
                  key: 'foo',
                  value: 'bar'
                },
                {
                  key: 'time',
                  value: time
                }
              ]
            }
          } else {
            payload.state = {
              'child info': [
                {
                  key: 'answer',
                  value: {
                    _custom: {
                      display: '42!!!',
                      value: 42,
                      tooltip: 'The answer'
                    }
                  }
                }
              ]
            }
          }
        }
      })
    })

    // Outside of setupDevtoolsPlugin

    window.addEventListener('mouseup', event => {
      devtoolsApi && devtoolsApi.addTimelineEvent({
        layerId: 'test-layer',
        event: {
          time: Date.now(),
          data: {
            info: 'window.mouseup',
            x: event.clientX,
            y: event.clientY
          }
        }
      })
    })
  }
}
