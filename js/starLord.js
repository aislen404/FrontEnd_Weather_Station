/**
 * Created by Aislen404 on 6/5/17.
 */


var app = {
    init : function () {

        MapsGoogle.init('40.408499','-3.996103');

        makeCorsRequest('GET', 'http://api.carriots.com/devices/', function (response) {

            var obj = JSON.parse(response);

            //Actual report
            var now = new Date(obj.result[0].at * 1000);
            now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

            var nowTemp = obj.result[0].data.TEMPERATURE_2;
            var evoTemp = nowTemp - (obj.result[1].data.TEMPERATURE_2);
            var textTemp = Math.abs(evoTemp);
            var chr_Temp = ' º C';

            var nowPressure = obj.result[0].data.PRESSURE;
            var evoPressure = nowPressure - (obj.result[1].data.PRESSURE);
            var textPressure = Math.abs(evoPressure);
            var chr_Press = ' Pa';

            var nowHumidity = obj.result[0].data.HUMIDITY;
            var evoHumidity = nowHumidity - (obj.result[1].data.HUMIDITY);
            var textHumidity = Math.abs(evoHumidity);
            var chr_Humidity = ' %';

            var nowLDR = obj.result[0].data.LDR;
            var textLDR = Math.abs(nowLDR);
            var chr_LDR = ' N/A';

            document.getElementById('now').innerHTML = now;
            document.getElementById('now-temp').innerHTML = nowTemp + chr_Temp;
            document.getElementById('now-press').innerHTML = nowPressure + chr_Press;
            document.getElementById('now-humd').innerHTML = nowHumidity + chr_Humidity;
            document.getElementById('now-ldr').innerHTML = nowLDR;


            //24H Reports
            var at = 0;

            var temp = 0;
            var hum = 0;
            var press = 0;
            var ldr = 0;

            var data1 = [];
            var data2 = [];
            var data3 = [];
            var data4 = [];

            for (var i = 0; i < 460; i++) {
                at = new Date(obj.result[i].at * 1000);
                press = obj.result[i].data.PRESSURE;
                temp = Math.abs(obj.result[i].data.TEMPERATURE_2);

                if (temp < 0) temp = Math.abs(temp); //correccion valores negativos
                hum = obj.result[i].data.HUMIDITY;
                ldr = obj.result[i].data.LDR;

                data1.push([at, temp]);
                data2.push([at, hum]);
                data3.push([at, press]);
                data4.push([at, ldr]);
            }

            Charts.initOtherCharts(chr_Temp,1,data1);
            Charts.initOtherCharts(chr_Humidity,2,data2);
            Charts.initOtherCharts(chr_Press,3,data3);
            Charts.initOtherCharts(chr_LDR,4,data4);
        });
    }
};
