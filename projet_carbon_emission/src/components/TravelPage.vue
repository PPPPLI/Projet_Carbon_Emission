<template>
    <div id="main"> 

        <div id="warningText"  :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }">* Please click search resultats to choose</div>
        <div id="selectDiv">
            <div class="selectBox">
                <input type="text" v-model="selectedCountry"  class="country-select"  ref="countryEle" placeholder="* From Country"  @change="onchangeSearch" @click="focusInput(1)">
            </div>
            <div class="selectBox"> 
                <input type="text" class="region-select" v-model="selectedCity"  ref="cityEle" placeholder="From City"  @change="onchangeSearch"  @click="focusInput(2)">
            </div>
            <div class="selectBox">
                <input type="text" v-model="selectedCountryDes"  class="country-select"  ref="countryEleDes" placeholder="* To Country"  @change="onchangeSearch" @click="focusInput(3)">
            </div>
            <div class="selectBox"> 
                <input type="text" class="region-select" v-model="selectedCityDes"  ref="cityEleDes" placeholder="To City"  @change="onchangeSearch"  @click="focusInput(4)">
            </div>
        </div>
        

        <div class="selectBox" id="transportDiv" :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }">
            <select v-model="selectedMode" ref="modeEle" @change="activateCarOption" id="transportSelect" @click="focusInput(5)">
                <option disabled selected>Transport</option>
                <option v-for="(ele,index) in transport" :key="index">{{ ele }}</option>
            </select>
        </div>

        <div id="vmDiv">

            <div id="vmsList" :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }">        
                <div v-for="(item, index) in paginatedData" :key="index" class="vmEle" :style="{width:elementWidth + 'px' }" @click="selectVm('vm'+index)" :id="'vm'+index">
                    {{item}}
                </div>
            </div>

            <div id="footerDiv" :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }" v-if="showCalBtn">
                <div :style="{ width: titleWidth + 'px' }" id="pagination">
                    <button @click="prevPage" :disabled="currentPage <= 1" class="pageBtn">Previous</button>
                    <span id="pageSpan"><input type="number" v-model="currentPage" id="pageInput" min="1" :max="totalPages" @change="limitNum">&nbsp;&nbsp;/  Total {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="pageBtn">Next</button>
                </div>
                <div class="vmEle" :style="{ width: searchWidth + 'px' }" id="calBtn" @click="calculate">Calculate</div>

            </div>
        </div>
    </div>
    <div :style="{ left: elementLeft + 'px !important', width:elementWidth + 'px' }" v-if="showChart" id="chart">
        <chart-page :options="charteData"></chart-page>
    </div>

</template>
  
<script>

import axios from 'axios';
import chartPage from './chartPage.vue';

export default {
    name: "cloud-page",
    components:{
        chartPage
    },

    data(){

        return{
            showVM: false,
            transport:["car","air","rail"],
            selectedCountry: "",
            selectedCity:"",
            selectedCityDes:"",
            selectedCountryDes:"",
            showCar:false,
            selectedCarType:"Car Type",
            selectedMode:"Transport",
            pageSize: 8,
            currentPage:1,
            elementLeft: 0,
            elementWidth: 0,
            previousSelectedVm: "",
            inputVal: "",
            apiKey : 'JAZW4BVWY549KEH6XDRJPKHWC8',
            calRes : "",
            data:"",
            searchCountry:[],
            searchCity:[],
            countrySelected:false,
            countryFocased:true,
            citySelected:false,
            cityFocased: false,
            countrySelectedDes:false,
            countryFocasedDes:false,
            citySelectedDes: false,
            cityFocasedDes: false,
            typeSelected:false,
            searchData:[],
            calculatedData:"",
            showChart: false,
            showCalBtn: false,
            charteData: {
                title: {
                    text: 'Emission Data',
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: 18,
                        lineHeight: 30
                    },
                    left: "0",
                    height: "500px"
                },
                grid: {
                    top: 130
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'line' },
                    formatter: '{b}: {c}'
                },
                xAxis: {
                    data: ['Direct Emission', 'Indirect Emission'],
                    axisLabel: {
                        color: '#ccc',
                        fontSize: 14
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    axisLabel: {
                        color: '#ccc',
                        fontSize: 14,
                        formatter: function(value) {
                            return value.toFixed(3);
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.2)',
                            width: 0.5,
                            type: 'solid'
                        }
                    }
                },
                series: [
                    {
                        name: 'KG',
                        type: 'bar',
                        data: [30, 70]
                    }
                ],
                legend: {
                    data: ['KG'],
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    },
                    bottom: "10px",
                    left: "center", 
                    orient: "vertical",

                }
            }


        }
    },

    methods:{

        focusInput(param){

            if(param == 1){

                this.countryFocased = true
                this.cityFocased = false
                this.cityFocasedDes = false
                this.countryFocasedDes = false
                this.$refs.countryEle.style.border = "2px red solid"
                this.$refs.cityEle.style.border = "2px black solid"
                this.$refs.countryEleDes.style.border = "2px black solid"
                this.$refs.cityEleDes.style.border = "2px black solid"
                this.$refs.modeEle.style.border = "2px black solid"

            }else if(param == 2){

                this.countryFocased = false
                this.cityFocased = true
                this.cityFocasedDes = false
                this.countryFocasedDes = false
                this.$refs.countryEle.style.border = "2px black solid"
                this.$refs.cityEle.style.border = "2px red solid"
                this.$refs.countryEleDes.style.border = "2px black solid"
                this.$refs.cityEleDes.style.border = "2px black solid"
                this.$refs.modeEle.style.border = "2px black solid"


            }else if(param == 3){

                this.countryFocased = false
                this.cityFocased = false
                this.cityFocasedDes = false
                this.countryFocasedDes = true

                this.$refs.countryEle.style.border = "2px black solid"
                this.$refs.cityEle.style.border = "2px black solid"
                this.$refs.countryEleDes.style.border = "2px red solid"
                this.$refs.cityEleDes.style.border = "2px black solid"
                this.$refs.modeEle.style.border = "2px black solid"

            }else if(param == 4){

                this.countryFocased = false
                this.cityFocased = false
                this.cityFocasedDes = true
                this.countryFocasedDes = false

                this.$refs.countryEle.style.border = "2px black solid"
                this.$refs.cityEle.style.border = "2px black solid"
                this.$refs.countryEleDes.style.border = "2px black solid"
                this.$refs.cityEleDes.style.border = "2px red solid"
                this.$refs.modeEle.style.border = "2px black solid"


            }else{


                this.$refs.countryEle.style.border = "2px black solid"
                this.$refs.cityEle.style.border = "2px black solid"
                this.$refs.countryEleDes.style.border = "2px black solid"
                this.$refs.cityEleDes.style.border = "2px black solid"
                this.$refs.modeEle.style.border = "2px red solid"
            }


            this.search()
        },

        activateCarOption(){

            if(this.selectedMode === "car"){

                this.showCar = true
            }else{

                this.showCar = false
            }
        },  


        prevPage(){

            if(this.currentPage > 1) {

                this.currentPage--;
                this.initializeSelection()

            }
        },

        nextPage(){

            if(this.currentPage < this.totalPages) {

                this.currentPage++;
                this.initializeSelection()

            }
        },

        updateOtherElementPosition() {
            const element = this.$refs.countryEle;
            this.elementLeft = this.getElementLeftOffset(element);

            const elementReg = this.$refs.cityEleDes;
            if(elementReg != null){

                this.elementWidth = this.getElementLeftOffset(elementReg) + this.getElementWidth(elementReg) - this.elementLeft
            }
        },

        getElementLeftOffset(element) {
            const rect = element.getBoundingClientRect();
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
            return rect.left + scrollLeft;
        },  

        getElementWidth(element){

            const rect = element.getBoundingClientRect();
            return rect.width;
        },

        selectVm(item){

            this.initializeSelection()
            this.previousSelectedVm = item
            let index = item.replace("vm","")

            const ele = document.querySelector("#"+item)
            ele.style.backgroundColor = "rgba(142, 227, 255, 0.1)"
            ele.style.border = "2px solid rgb(225, 225, 225)"

            if(this.countryFocased){

                this.selectedCountry = this.paginatedData[index]
                this.countrySelected = true

            }else if(this.cityFocased){

                this.selectedCity = this.paginatedData[index]
                this.citySelected = true

                if(this.selectedCountry === ""){

                    for(let ele of this.data){

                        if(ele.cities.includes(this.selectedCity)){

                            this.selectedCountry = ele.country
                            this.countrySelected = true
                            break
                        }
                    }
                }


            }else if(this.countryFocasedDes){

                this.selectedCountryDes = this.paginatedData[index]
                this.countrySelectedDes = true
            }else{

                this.selectedCityDes = this.paginatedData[index]
                this.citySelectedDes = true

                if(this.selectedCountryDes === ""){

                    for(let ele of this.data){

                        if(ele.cities.includes(this.selectedCityDes)){

                            this.selectedCountryDes = ele.country
                            this.countrySelectedDes = true
                            break
                        }
                    }
                }

            }

            this.search()
        },

        initializeSelection(){

            if(this.previousSelectedVm != ""){

                const preEle = document.querySelector("#"+this.previousSelectedVm)
                

                preEle.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                preEle.style.border = "2px solid rgb(57, 57, 57)"
                this.previousSelectedVm = ""
                

            }

        },

        onchangeSearch(){

            if(this.countryFocased){

                this.countrySelected = false
                this.selectedCity = ""
                this.citySelected = false

            }else if(this.cityFocased){

                this.citySelected = false
            }else if(this.countryFocasedDes){

                this.countrySelectedDes = false
                this.selectedCityDes = ""
                this.citySelectedDes = false

            }else if(this.cityFocasedDes){

                this.citySelectedDes = false
            }

            this.search()

        },

        search(){

            for(let i = 0; i < this.paginatedData.length; i++){

                const preEle = document.querySelector("#vm"+i)
                preEle.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                preEle.style.border = "2px solid rgb(57, 57, 57)"
                this.previousSelectedVm = ""
            }


            if(this.countryFocased){

                this.inputVal = this.selectedCountry

            }else if(this.cityFocased){

                this.inputVal = this.selectedCity

            }else if(this.countryFocasedDes){

                this.inputVal = this.selectedCountryDes

            }else{

                this.inputVal = this.selectedCityDes
            }

            const newList = []


            if(this.inputVal !== ""){


                const regex = new RegExp(`${this.inputVal}.*`,"i");


                if(this.countryFocased){

                    for(let ele of this.searchCountry){

                        if(regex.test(ele)) newList.push(ele)
                    }

                }else if(this.cityFocased){

                    if(this.countrySelected){

                        for(let ele of this.data){

                            if(ele.country == this.selectedCountry){

                                for(let city of ele.cities){

                                    if(regex.test(city)) newList.push(city)
                                }
                            }
                        }
                    }else{

                        for(let ele of this.searchCity){


                            if(regex.test(ele)) newList.push(ele)
                        }

                    }
                }else if(this.countryFocasedDes){

                    for(let ele of this.searchCountry){

                        if(regex.test(ele)) newList.push(ele)
                    }
                }else{
                    if(this.countrySelectedDes){

                        for(let ele of this.data){

                            if(ele.country == this.selectedCountryDes){

                                for(let city of ele.cities){

                                    if(regex.test(city)) newList.push(city)
                                }
                            }
                        }
                    }else{

                        for(let ele of this.searchCity){


                            if(regex.test(ele)) newList.push(ele)
                        }

                    }
                }

                this.searchData = newList

            }else{

                if(this.countryFocased){

                    this.searchData = this.searchCountry
                }else if(this.cityFocased){

                    if(this.countrySelected){

                        for(let ele of this.data){

                            if(ele.country == this.selectedCountry){

                                for(let city of ele.cities){

                                    newList.push(city)
                                }
                            }
                        }

                        this.searchData = newList
                    }else{

                        this.searchData = this.searchCity
                    }
                }else if(this.countryFocasedDes){

                    this.searchData = this.searchCountry

                }else{
                    
                    if(this.countrySelectedDes){

                        for(let ele of this.data){

                            if(ele.country == this.selectedCountryDes){

                                for(let city of ele.cities){

                                    newList.push(city)
                                }
                            }
                        }

                        this.searchData = newList
                    }else{

                        this.searchData = this.searchCity
                    }
                }
            }

            this.totalPages === 0? this.currentPage = 0:this.currentPage = 1
        },

        limitNum(){

            if(this.currentPage <= 0) this.currentPage = 1

            if(this.currentPage > this.totalPages) this.currentPage = this.totalPages
        },

        calculate(){

            if(this.citySelected  && this.citySelectedDes && this.countrySelected && this.countrySelectedDes && this.selectedMode != "Transport"){

                const url = "https://preview.api.climatiq.io/travel/v1-preview1/distance"


                axios.post(url,

                    {

                        "origin":{

                            "query":`${this.selectedCity}, ${this.selectedCountry}`
                        },
                        "destination": {
                            "query": `${this.selectedCityDes}, ${this.selectedCountryDes}`
                        },
                        "travel_mode": this.selectedMode,
                    },

                    {headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                    }},

                ).then(res =>{

                    this.calculatedData = res

                    const instanceInfo = ` Total: ${this.calculatedData.data.co2e} ${this.calculatedData.data.co2e_unit}   |   Distance: ${this.calculatedData.data.distance_km} KM(s)`;

                    this.charteData.series[0].data = [
                        { value: this.calculatedData.data.direct_emissions.co2e, itemStyle: { color: 'rgb(255, 121, 121)' } },
                        { value: this.calculatedData.data.indirect_emissions.co2e, itemStyle: { color: 'rgb(88, 181, 150)' } },
                    ];

                    this.charteData.series[0].name = instanceInfo;

                    this.charteData.yAxis.max = parseFloat(this.calculatedData.data.co2e).toFixed(3);

                    this.charteData.title.text = `Travel CO2 Emission:\nFrom: ${this.calculatedData.data.origin.name}\nTo: ${this.calculatedData.data.destination.name}`;

                    this.charteData.legend.data = [instanceInfo]; 

                    this.showChart = true;
                }).catch(err =>{

                    console.log(err)
                })
            }else{

                if(!this.countrySelected){

                    this.$refs.countryEle.style.border = "1px red solid"
                }

                if(!this.countrySelectedDes){

                    this.$refs.countryEleDes.style.border = "1px red solid"
                }

                if(!this.citySelected){

                    this.$refs.cityEle.style.border = "1px red solid"
                }

                if(!this.citySelectedDes){

                    this.$refs.cityEleDes.style.border = "1px red solid"
                }

                if(this.selectedMode == "Transport"){

                    this.$refs.modeEle.style.border = "1px red solid"
                }
            }
        },

        async fetchData() {
            try {

                const res = await axios.get("https://countriesnow.space/api/v0.1/countries");

                this.data = res.data.data;

                this.searchCountry = this.data.map(ele => ele.country); 
                this.searchCity = this.data.flatMap(ele => ele.cities);

                this.searchData = this.searchCountry;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }


    },  

    mounted(){

        this.fetchData()
        
        this.updateOtherElementPosition();

        window.addEventListener("scroll", this.updateOtherElementPosition);
        window.addEventListener("resize", this.updateOtherElementPosition);

        this.$refs.countryEle.style.border = "2px red solid"

        this.showCalBtn = true
    },

    beforeUnmount() {
        window.removeEventListener("scroll", this.updateOtherElementPosition);
        window.removeEventListener("resize", this.updateOtherElementPosition);
    },



    computed: {


        totalPages() {
            return Math.ceil(this.searchData.length / this.pageSize);
        },


        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.searchData.slice(start, end);
        },

        searchWidth(){

            return parseInt(this.elementWidth) * 0.58
        },

        titleWidth(){

            return parseInt(this.elementWidth) * 0.4
        }
    },

}
</script>
  
<style scoped>

#durationDiv{

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#vmTitle{

    background-color:  transparent;
    user-select: none;
    cursor: default;
    font-size: large;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

}

#warningText{

    color: rgba(255, 255, 255, 0.5);
    position: relative;
    text-align: start;
}

#vmTitle >div:first-child{

    border: none;
    color: rgb(255, 121, 121);
    font-size: large;
    letter-spacing: 2px;
    background-color: transparent;
    box-sizing: border-box;
    user-select: none;
    cursor: default;
}

#vmsList{

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-top: 1rem;
}

#chart{

position: relative;
width: 100%;
height: 700px;
color: white;
top: 30px !important;
}


#vmsList > div:nth-child(n):hover{

    border: 2px solid rgb(225, 225, 225) !important;
    background-color: rgba(255, 255, 255, 0.3) !important;
}

.vmEle{

    border: 2px solid rgb(57, 57, 57);
    border-radius: 5px;
    height: 35px;
    min-height: fit-content;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 3px;
    color: white;
    cursor: pointer;
    background-color:  rgba(255, 255, 255, 0.1);
    letter-spacing: 1px;

}

#main{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

#selectDiv{

    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50vw;
    height: 5vw;
    left: 50%;
    transform: translateX(-50%);
}

#transportDiv{

    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    height: 2vw;

}

#transportSelect{

    color: rgba(255, 255, 255, 0.5);
}

.selectBox{

    width: 20%;
}

select,option,input{

    padding: 5px;
    border-radius: 5px;
    border: 2px rgb(0, 0, 0) solid;
    font-size: large;
    color: rgb(216, 216, 216);
    text-align: center;
    width: 100%;
    background-color:  rgba(255, 255, 255, 0.1);
    cursor: pointer;

}

input:focus{

    outline: none;
}

option{

    color: black;
}

input::placeholder{

    color: rgba(217, 217, 217,0.5);
    padding: 5px;
}

#footerDiv{
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
}

#pagination{

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#pageSpan{

    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: fit-content;
}

#durationInput{

    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    box-sizing: border-box;
    padding: 2px;
    height: 35px;
    border: 2px solid rgba(237, 237, 237,0.5);
    border-radius: 5px;
    box-sizing: border-box;
}

#pageInput{

    width: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    text-align: center;
    box-sizing: border-box;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid black;

}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

input[type="number"] {
    -webkit-appearance: none;
    -moz-appearance: textfield; 
    appearance: none;
}

.pageBtn{

    width: 70px;
    height: 35px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(216, 216, 216);
    cursor: pointer;
    transition: all 1s;
}

.pageBtn:hover{

    border: 1px solid rgb(248, 248, 248);
    background-color: rgba(255, 255, 255, 0.3);

}

#calBtn{

    color: rgb(255, 255, 255);
    background-color: rgba(255,255,255,0.3);
    transition: all 1s;
    user-select: none;
}

#calBtn:hover{

    border: 1px solid rgb(248, 248, 248);
    background-color: transparent;
    box-sizing: border-box;
}

</style>