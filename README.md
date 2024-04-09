# EVALUATEFUNCTION(expression, variable, value)
Google Apps Script Custom Formula that evaluates a mathematical expression with a variable substituted by a given value.

### Since Google Sheets doesn't have a built in function for this, I made one myself. 

## YouTube Shorts Demo
https://youtube.com/shorts/xIv6wPgIyZo?si=cgYEywZShYYc9FtW

## EVALUATEFUNCTION() Demo
<table>
  <tr>
    <th colspan="2">Syntax Errors return the entire string to be evaluated instead of the final result (Shown on the right).</th>
  </tr>
  <tr>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[0].png" alt="EVALUATEFUNCTION_demo[0]" width="360" height="360"></td>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[1].png" alt="EVALUATEFUNCTION_demo[1]" width="360" height="360"></td>
  </tr>
  <tr>
    <th colspan="2">EVALUATEFUNCTION("x^(2) + (8/3)*x - 20","x", 3)</th>
  </tr>
  <tr>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[2].png" alt="EVALUATEFUNCTION_demo[2]" width="360" height="360"></td>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[3].png" alt="EVALUATEFUNCTION_demo[3]" width="360" height="360"></td>
  </tr>
  <tr>
    <th colspan="2">EVALUATEFUNCTION("cos(x) - x","x", =PI()) </br> Note: Trigonometric Functions evaluates to DEGREES by default, you can change it to RADIANS in the `Code.gs` Editor</th>
  </tr>
  <tr>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[4].png" alt="EVALUATEFUNCTION_demo[4]" width="360" height="360"></td>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[5].png" alt="EVALUATEFUNCTION_demo[5]" width="360" height="360"></td>
  </tr>
  <tr>
    <th colspan="2">EVALUATEFUNCTION("log(x) - 1/x","x", 3)</th>
  </tr>
  <tr>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[6].png" alt="EVALUATEFUNCTION_demo[6]" width="360" height="360"></td>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[7].png" alt="EVALUATEFUNCTION_demo[7]" width="360" height="360"></td>
  </tr>
  <tr>
    <th colspan="2">EVALUATEFUNCTION("log10(x) - 1/x","x", 3)</th>
  </tr>
  <tr>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[8].png" alt="EVALUATEFUNCTION_demo[8]" width="360" height="360"></td>
    <td align="center"><img src="/demo-images/EVALUATEFUNCTION_demo[9].png" alt="EVALUATEFUNCTION_demo[9]" width="360" height="360"></td>
  </tr>
</table>

## How to use?
- Just copy the entire Javascript code from `EVALUATEFUNCTION.js` and paste it into your own Google App Script `Code.gs`.
- Save

## References
- Code inspired (mostly copied) from [Code Explained](https://www.youtube.com/@CodeExplained)'s Video: https://www.youtube.com/watch?v=52GL_cfLBYs

## Bugs?
- `create an issue`

Thank you.
