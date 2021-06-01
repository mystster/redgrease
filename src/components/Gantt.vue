<template>
<div class="toolbox">
    <button @click="updateFirstRow">Update first row</button>
    <button @click="changeZoomLevel">Change zoom level</button>
</div>
<div class="gstc-wrapper" ref="gstcNode"></div>
</template>

<script setup lang='ts'>
import GSTC from 'gantt-schedule-timeline-calendar';
import type {Config, GSTCResult, Items} from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';
import 'gantt-schedule-timeline-calendar/dist/style.css';
import { onBeforeUnmount, onMounted, ref } from '@vue/runtime-core';

let gstc:GSTCResult, state:any;
// helper functions
/**
 * @returns { import("gantt-schedule-timeline-calendar").Rows }
 */
function generateRows(){
  const rows: {[index: string]:{id:string, label:string}} = {};
  for(let i=0;i<100;i++){
    const id = GSTC.api.GSTCID(i.toString());
    rows[id]={
      id,
      label:`Row ${i}`
    }
  }
  return rows;
}
/**
 * @returns { import("gantt-schedule-timeline-calendar").Items }
 */
function generateItems(){
  const items: Items = {};
  let start = GSTC.api.date().startOf('day').subtract(6,'day');
  for(let i =0;i<100;i++){
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID((Math.floor(Math.random()*100)).toString());
    start = start.add(1,'day');
    items[id] = {
      id,
      label:`Item ${i}`,
      rowId,
      time:{
        start: start.valueOf(),
        end: start.add(1,'day').endOf('day').valueOf()
      }
    }
  }
  return items;
}
// main component
    /**
     * @type { import("gantt-schedule-timeline-calendar").Config }
     */
    const gstcNode = ref<HTMLDivElement>();
    const config: Config = {
      licenseKey:'====BEGIN LICENSE KEY====\no/8hUU1QvWy9qg5/INxq1mc2fQ3sXv7xdfscKZrNOHcWQ79aWpFmTQRginlMjNkbB5v5Q2IgQllAiu3qpv1nZSI5UQlKS2WJSaOHD1SRa762jkylph8gRjbSDw5BSLtWJBgBvu9ZC8E5ja2ZkLNZ2Aw++aEj9XZdoqI3SHtY7Ih6NwpDwiu7/1ls9CSf/MD3fFSoUrY0mnXsb7/1D9ErblSQvR4Or5iG5h5lV5QjtusEzrN1UCtC7X2QrDwAjDQFbigrecmuNYqcAY+SEGZzQfNmDBdDEmOjc9naDi9ivTq7lAEHiz85lex6+6+BfcULJ1zLb7xQiV0pUpuAF4/8tw==||U2FsdGVkX1/K1oQ57ZbU1iNys64mVoxHtRYR7pVyCl8vSwwUI0oiyGpwgyPhzYPOlFt7gBCA9Uf8HZTgcte8Qt9S5YFO0g+VBxDZjW2HsIQ=\nBuKbMy9CqD6q+qwxCmn1giYO7craDxHHcPn+ckwjQBs9iBC1pGd33MSlFc9md2Ut2Cl8HDVjVcP5iltfkHWQoR4EOfX1qSOkiLr6maj7LKQCnBIYza/IMNsydoZdp7jHwo7AFVQvwNRUPrlUUn4QMVyVRSFF9KBVyENtB44z73PRoLcs7t8CqPvOUkyw7grp0iv7Khz9NOpbSeMA0zTbQ49f9jWOKAZFAtnjDkRkmmwjvJ1/sbM3FzWg3EcU39zN07hZchzy5dhrppOKC+3mGZg3sUa2YM9aGGAfOQXlTc+A/kPAlM3FatvZAULaPOWHJi7z/UuDdFnewAlaupX74A==\n====END LICENSE KEY====',
      plugins:[TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
      list:{
        columns:{
          data:{
            [GSTC.api.GSTCID('id')] :{
              id:GSTC.api.GSTCID('id'),
              width:60,
              data:({row})=>GSTC.api.sourceID(row.id),
              header:{
                content:'ID'
              }
            },
            [GSTC.api.GSTCID('label')] :{
              id:GSTC.api.GSTCID('label'),
              width: 200,
              data:'label',
              header:{
                content: 'Label'
              }
            }
          }
        },
        rows:generateRows()
      },
      chart:{
        items: generateItems()
      }
    };
    state = GSTC.api.stateFromConfig(config);
    onMounted( () => {
        if(gstcNode.value != undefined){
            gstc = GSTC({
              element: gstcNode.value,
              state,
            });
        }
    })
  onBeforeUnmount(() => {
    if (gstc) gstc.destroy();
  });
    const updateFirstRow = () => {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row: any) =>{
        row.label = 'Changed dynamically';
        return row;
      });
    }

    const changeZoomLevel = () => {
      state.update('config.chart.time.zoom', 21);
    }

</script>