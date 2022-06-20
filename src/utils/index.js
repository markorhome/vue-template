// import Cookies from 'js-cookie'
// export function getUrlParam(value) {
//     return decodeURIComponent((new RegExp('[?|&]' + value + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || ""
//  }
// export function getToken() {
//     let token = Cookies.get('token')
//     return  token
// }
//  export function setToken(token) {
//     Cookies.set('token')
//  }
export function preDate() {
   let date = new Date()
   let month = date.getMonth() + 1
   let days = date.getDate() - 1
   let year = date.getFullYear()


   if(date.getDate()==1) {
      month = month - 1
      if (month < 1) {
         year = year - 1
         month = month + 12
      }
      if (month == 2) {
         days = days + 28
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
         days = days + 30
      } else {
         days = days + 31
      }
   }
   return {
      date,
      month,
      days,
      year,
      preDate: year + '-' + repair(month) + '-' + repair(days)
   }
}
export function getNowTime(index) {
   
   let arr = []
   if(index == 0) {
      arr = [{label: '近一天'},{label: '近一周'},{label: '近一个月'}]
   } else if(index == 1) {
      arr = [{label: '近一个月'},{label: '近三个月'},{label: '近半年'},{label: '近一年'}]
   }
    // 3个月  6个月 1年 2年
   let {date,month,days,year} = preDate()
   
   arr.map(item=>{
      let Pyear = year, Pmonth = month, Pday = days
      item.result = {
         startT: '',
         endT: '',
         id: 0
      }
      if(item.label == '近一天'){
         item.result.id = 1
      } else if (item.label == '近一个月') {
         Pmonth = Pmonth - 1

         if(Pmonth < 1) {
            Pyear = Pyear - 1
            Pmonth = Pmonth + 12
         }
         if (Pmonth == 2 && Pday > 28) {
            Pday = 28
         } else if((Pmonth == 4 || Pmonth == 6 || Pmonth == 9 || Pmonth == 11) && Pday > 30) {
            Pday = 30
         }
         item.result.id = 30
      } else if(item.label == '近一周') {
         Pday = Pday - 7
         if (Pday < 1) {
            Pmonth = Pmonth - 1
            if (Pmonth < 1) {
               Pyear = Pyear - 1
               Pmonth = Pmonth + 12
            }
            if (Pmonth == 2) {
               Pday = Pday + 28
            } else if (Pmonth == 4 || Pmonth == 6 || Pmonth == 9 || Pmonth == 11) {
               Pday = Pday + 30
            } else {
               Pday = Pday + 31
            }
         }
         item.result.id = 7
      } else if(item.label == '近三个月') {
 
         Pmonth = Pmonth - 3

         if(Pmonth < 1) {
            Pyear = Pyear - 1
            Pmonth = Pmonth + 12
         }
         if (Pmonth == 2 && Pday > 28) {
            Pday = 28
         } else if((Pmonth == 4 || Pmonth == 6 || Pmonth == 9 || Pmonth == 11) && Pday > 30) {
            Pday = 30
         }

      } else if(item.label == '近半年') {
         Pmonth = Pmonth - 6

         if(Pmonth < 1) {
            Pyear = Pyear - 1
            Pmonth = Pmonth + 12
         }
         if (Pmonth == 2 && Pday > 28) {
            Pday = 28
         } else if((Pmonth == 4 || Pmonth == 6 || Pmonth == 9 || Pmonth == 11) && Pday > 30) {
            Pday = 30
         }
         
      } else if(item.label == '近一年') {
         Pyear = Pyear - 1      
      } else if(item.label == '近两年') {
         Pyear = Pyear - 2
      }

      item.result.startT = Pyear + '-' + repair(Pmonth) + '-' + repair(Pday)
      item.result.endT = year + '-' + repair(month) + '-' + repair(days)
   })

   return arr

}
function repair(num) {
   return num < 10 ? '0' + num : num
}
export function dateFormat(data, type) {
   let result = []
   let param = {
      '12': '四季',
      '09': '三季',
      '06': '二季',
      '03': '一季'
   }
   let year, month, date
   data && data.map(item => {
      year = item.slice(0, 4)
      month = item.slice(4, 6)
      if (type == 0 && param[month]) {
         result.push({
            id: item,
            label: year + '年' + param[month] + '报'
         })
      } else if (param[month]) {
         date = item.slice(6, 8)

         result.push({
            id: item,
            label: year + '年第' + param[month] + '度 (' + month + '月' + date + '日)'
         })
      }
   })
   return result
}
export function removeClass(el, className) {

   let reg = new RegExp(className)
   let newClass = el.className.replace(reg, '')
   el.className = newClass
}
export function hasClass(el, className) {
   let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
   return reg.test(el.className)
}
export function addClass (el, className) {
   if (hasClass(el, className)) {
     return
   }
   let childNodes = el.parentNode.childNodes
   let len = childNodes.length
   for(let i = 0; i < len; i++) {
      removeClass(childNodes[i],className)
   }
  
   let newClass = el.className.split(' ')
   newClass.push(className)
   el.className = newClass.join(' ')
 }
export function dateTrans(date) {
   return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
}

export function dateQ(date) {

   let param = {
      '12': 'Q4',
      '09': 'Q3',
      '06': 'Q2',
      '03': 'Q1'
   }
   let year = date.slice(2, 4)
   let month = date.slice(4, 6)
   return year + param[month]
}
export function camel2snake(data) {
   if (!data) return ''

   const newKey = data.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`)

   return newKey
}

export function numAbb(value) {
   let length = String(value).length
   if (length >= 9) {
      return String(value).slice(0, 1) + '.' + String(value).slice(1, 2) + '亿'
   } else if (length >= 5) {
      return String(value).slice(0, String(value).length - 4) + '万'
   }
}

export function setStepData(data) {
   let list = [],result= [], time

   data && data.map(item => {

      list.push({
         time: item.publishedAt.substr(5,2) + '月',
         data: [item.title],
         articleType: [item.articleType],
         selectType: [item.selectType],
         articleUrl: [item.articleUrl]
      })
   })
   list.map(item=>{
   
      if(time != item.time) {
         time = item.time
         result.push(item)
      }else{
         result[result.length-1].data.push(item.data[0])
         result[result.length-1].articleUrl.push(item.articleUrl[0])
         result[result.length-1].articleType.push(item.articleType[0])
         result[result.length-1].selectType.push(item.selectType[0])
      }
   })
   return result
}

export function bannerData(data) {
   let time

   data && data.map(item => {
      item.list = []
      item.sonList.splice(2)
      item.lecturerArticleList && item.lecturerArticleList.map(item1=>{

         item.list.push({
            time: item1.createdAt.substr(5,2) + '月',
            data: [item1.title],
            articleUrl: [item1.contentUrl],
            articleType: [item1.articleType],
            avatar: [item1.avatar]
         })
      })
   })
   data && data.map(item => {
      item.stepData = []
      item.list && item.list.map(item1=>{

         if(time != item1.time) {
            time = item1.time
            item.stepData.push(item1)
         }else{
            item.stepData[item.stepData.length-1].data.push(item1.data[0])
            item.stepData[item.stepData.length-1].articleUrl.push(item1.articleUrl[0])
            item.stepData[item.stepData.length-1].articleType.push(item1.articleType[0])
            item.stepData[item.stepData.length-1].avatar.push(item1.avatar[0])
         }
      })
   })
   return data
}

export function setThemeTree(data) {

   let arr = setTableData(data,true,true)
   // data && data.map(item => {
   //    if (item.sonList && item.sonList.length) {
   //       item.children = item.sonList
   //       setThemeTree(item.children)
   //    }
   // })

   return arr
}
let index = 11
export function setTableData(data,hasChild, level) {
   let list = []
   //        name: "航运",
   //     code: "000001",
   //     zdf: "+5%",
   //     lzgN: "中远海控",
   //     lzgZDF: "+6%",
   //     price: "7.82",
   //     zdp: "3/2/1",
   //     rxly: '主营国际船舶'
   let param
   data && data.map(item => {
      param = {
         name: item.conceptName,
         zdf: item.ratio,
         lzgN: item.maxRise,
         zdp: [item.riseNum, item.fallNum, item.calmNum],
         code: item.conceptCode,
         lzgZDF: item.pctChg,
         price: item.stockClose,
         reason: item.reason,
         articleNum: item.articleNum,
         conceptLevel: item.conceptLevel
      }

      param.id=index ++
      if(hasChild && item.sonNum > 0) {
         // param.children = setTableData(item.sonList,true)
         param.hasChildren = true
         if(level) {
            param.level = 0
         }else{
            param.level = 1
         }
      }
      list.push(param)
   })
   return list
}
export function selectFrom(minval,maxval) {
   var choice = maxval - minval
   return Math.floor(Math.random()*choice + minval)
}