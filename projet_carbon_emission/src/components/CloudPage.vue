<template>
    <div id="main"> 
        <div id="selectDiv">
            <div class="selectBox">
                <label for="provider-select"></label>
                <select v-model="selectedProvider"  id="provider-select" @change="activateRe" ref="providerEle">
                    <option disabled selected>Cloud Providers</option>
                    <option v-for="(item,index) in providers" :key="item.provider_id" :value="index">{{ item.provider_full_name}}</option>
                </select>
            </div>
            <div class="selectBox"> 
                <label for="region-select"></label>
                <select v-if="showRegions" id="region-select" v-model="selectedRegion" @change="activateVM" ref="regionEle" @click="focused(1)">
                    <option disabled selected>Regions</option>
                    <option v-for="(region,index) in regions" :key="index" :value="region">{{ region }}</option>
                </select>
            </div>
        </div>
        <div id="vmDiv" v-if="showVM">

            <div id="vmsList" :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }"> 
                <div id="vmTitle" :style="{ width: elementWidth + 'px' }"> 
                    <div class="vmEle" :style="{ width: titleWidth + 'px' }" id="durationDiv">
                        <span>Duration</span>
                        <input type="number" min="1" id="durationInput" v-model="duration" @change="limitDuration">
                    </div>
                    <input type="text" class="vmEle" :style="{ width: searchWidth + 'px' }" placeholder ="Type for search..." @change="searchVms" v-model="inputVal" ref="vmEle"  @click="focused(2)">
                </div>
                
                <div v-for="(item, index) in paginatedData" :key="index" class="vmEle" :style="{width:elementWidth + 'px' }" @click="selectVm('vm'+index)" :id="'vm'+index">
                    {{ item }}
                </div>
            </div>

            <div id="footerDiv" :style="{ left: elementLeft + 'px', width:elementWidth + 'px' }">
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
        <chart-page :options="data"></chart-page>
    </div>
        
</template>
  
<script>

import axios from 'axios';
import ChartPage from './chartPage.vue';

export default {
    name: "cloud-page",
    components:{
        ChartPage
    },

    data(){

        return{
            showRegions:false,
            showVM: false,
            providers:[],
            selectedProvider: "Cloud Providers",
            selectedRegion:"Regions",
            regions:[],
            vms:[],
            pageSize: 8,
            currentPage:1,
            elementLeft: 0,
            elementWidth: 0,
            previousSelectedVm: "",
            inputVal: "",
            duration: 1,
            apiKey : 'JAZW4BVWY549KEH6XDRJPKHWC8',
            calRes:"",
            showChart: false,
            data:{
                title: {
                    text: '',
                    textStyle: {
                        color: '#fff',
                        fontSize: 18
                    },
                    left:"center"
                },
                tooltip: {

                    trigger: 'axis',
                    axisPointer: { 
                        type: 'line' 
                    },
                    formatter: '{b}: {c}'
                },
                xAxis: {
                    data: ['Memory', 'Cpu', 'Embodied Cpu'],
                    axisLabel: {
                        color: '#ccc',
                        fontSize: 14
                    }
                },
                yAxis: {
                    min: 0,
                    max: 0,
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
                    },


                },
                series: [
                {
                    name: 'KG',
                    type: 'bar',
                    data: []
                }
                ],
                legend:{
                    data:[],
                    textStyle:{

                        color:"#fff",
                        fontSize:14
                    },
                    color: "#fff",
                    bottom: "10px",
                    left: "center", 
                    orient: "vertical",
                }
            }
            
        }
    },

    methods:{

        activateRe(){
            if(!this.showRegions) this.showRegions = true

            this.regions = this.providers[this.selectedProvider].regions

            this.selectedRegion = "Regions"
        },

        activateVM(){

            if(!this.showVM) this.showVM = true

            this.vms = this.providers[this.selectedProvider].virtual_machine_instances

            const elementReg = this.$refs.regionEle;
            this.elementWidth = this.getElementLeftOffset(elementReg) + this.getElementWidth(elementReg) - this.elementLeft

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
            const element = this.$refs.providerEle;
            this.elementLeft = this.getElementLeftOffset(element);

            const elementReg = this.$refs.regionEle;
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

            const ele = document.querySelector("#"+item)
            ele.style.backgroundColor = "rgba(142, 227, 255, 0.1)"
            ele.style.border = "2px solid rgb(225, 225, 225)"
        },

        focused(param){

            if(param === 1){

                this.$refs.regionEle.style.border = "2px black solid"
            }

            if(param === 2){

                this.$refs.vmEle.style.border = "2px black solid"
            }
        },

        initializeSelection(){

            if(this.previousSelectedVm != ""){

                const preEle = document.querySelector("#"+this.previousSelectedVm)
                preEle.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                preEle.style.border = "2px solid rgb(57, 57, 57)"
                this.previousSelectedVm = ""
            }

        },

        searchVms(){

            const vmsList = this.providers[this.selectedProvider].virtual_machine_instances


            if(this.inputVal !== ""){


                const regex = new RegExp(`${this.inputVal}.*`,"ig");

                const newList = []


                for(let ele of vmsList){


                    if(regex.test(ele)) newList.push(ele)
                }

                this.vms = newList

            }else{

                this.vms = vmsList
            }

            this.totalPages === 0? this.currentPage = 0:this.currentPage = 1
        },

        limitNum(){

            if(this.currentPage <= 0) this.currentPage = 1

            if(this.currentPage > this.totalPages) this.currentPage = this.totalPages
        },

        limitDuration(){

            if(this.duration <= 0) this.duration = 1

            if(this.duration > 999) this.duration = 999
        },

        calculate(){

            if(this.selectedRegion != "Regions" && this.previousSelectedVm != ""){

                this.showChart = true;


                const url = `https://api.climatiq.io/compute/v1/${this.selectedProvider}/instance`
                const vmIndex = parseInt(this.previousSelectedVm.slice(2))

                axios.post(url,

                    {

                        "region":this.selectedRegion,
                        "instance":this.vms[(this.pageSize-1) * this.currentPage + vmIndex],
                        "duration":this.duration,
                        "duration_unit": "h"
                    },

                    {headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                    }},

                ).then(response =>{


                    this.calRes = response;

                    const instanceInfo = ` Instance: ${this.calRes.data.calculation_details.instance}   |   Duration: ${this.duration} hour(s)`;

                    this.data.series[0].data = [
                        { value: this.calRes.data.memory_estimate.co2e, itemStyle: { color: 'rgb(255, 121, 121)' } },
                        { value: this.calRes.data.cpu_estimate.co2e, itemStyle: { color: 'rgb(88, 181, 150)' } },
                        { value: this.calRes.data.embodied_cpu_estimate.co2e, itemStyle: { color: 'rgb(88, 141, 181)' } }
                    ];

                    this.data.series[0].name = instanceInfo;

                    this.data.yAxis.max = parseFloat(this.calRes.data.total_co2e).toFixed(3);

                    this.data.title.text = "Cloud CO2 Emission";

                    this.data.legend.data = [instanceInfo]; 

                }).catch(error=>{

                    console.log(error)
                })
            }else{

                if(this.selectedRegion === "Regions"){

                    this.$refs.regionEle.style.border = "1px red solid"
                }

                if(this.previousSelectedVm === ""){

                    this.$refs.vmEle.style.border = "1px red solid"
                }
            }

        }
    },  

    mounted(){

        if(localStorage.getItem("vm") == null){

            const url = 'https://api.climatiq.io/compute/v1/metadata'

            axios.get(url, {

                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.providers = response.data.cloud_providers
                    console.log('Api data: '+response.data.cloud_providers)
                    localStorage.setItem("vm",JSON.stringify(this.providers))
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }else{

            this.providers = JSON.parse(localStorage.getItem('vm'))

        }



        this.updateOtherElementPosition();

        window.addEventListener("scroll", this.updateOtherElementPosition);
        window.addEventListener("resize", this.updateOtherElementPosition);
    },

    beforeUnmount() {
        window.removeEventListener("scroll", this.updateOtherElementPosition);
        window.removeEventListener("resize", this.updateOtherElementPosition);
    },



    computed: {


        totalPages() {
            return Math.ceil(this.vms.length / this.pageSize);
        },


        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.vms.slice(start, end);
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

#vmsList >div:nth-child(2){

    margin-top: 15px;
}

#vmsList > div:nth-child(n+2):hover{

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
    overflow-x: hidden;
}

#selectDiv{

    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50vw;
    left: 50%;
    transform: translateX(-50%);
}

.selectBox{

    width: 300px;
    min-width: fit-content;
}

select,option{

    padding: 5px;
    border-radius: 5px;
    border: 2px rgb(0, 0, 0) solid;
    font-size: large;
    color: rgb(216, 216, 216);
    text-align: center;
    width: 300px;
    background-color:  rgba(255, 255, 255, 0.1);
    cursor: pointer;

}

option{

    color: black;
}

input::placeholder{

    color: rgb(217, 217, 217);
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

#chart{

    position: relative;
    width: 100%;
    height: 400px;
    color: white;
    top: 30px !important;
}


#pageSpan{

    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: fit-content;
    color: rgba(255, 255, 255, 0.7);
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

    width: 30px;
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