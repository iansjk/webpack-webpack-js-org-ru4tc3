import $ from 'jquery';
import 'jquery-ui/dist/jquery-ui.js';
import 'jquery-autosize';

$(() => {
  $('#autosize').autosize();
  $('#dialog').dialog();
});
