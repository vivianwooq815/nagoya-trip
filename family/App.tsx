
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Card, Badge, RoundedButton } from './components/Card';
import { CATEGORY_COLORS } from './constants';
import { Category } from './types';
import { getInitialData, saveToLocal, exportDataAsText, importDataFromText } from './lib/storage';

// --- Sub-components for each tab ---

const ScheduleTab = ({ data }: { data: any }) => {
  const dates = [
    { label: "02/25 Tue", value: "2025-02-25" },
    { label: "02/26 Wed", value: "2025-02-26" },
    { label: "02/27 Thu", value: "2025-02-27" },
    { label: "02/28 Fri", value: "2025-02-28" },
    { label: "03/01 Sat", value: "2025-03-01" },
    { label: "03/02 Sun", value: "2025-03-02" },
    { label: "03/03 Mon", value: "2025-03-03" },
  ];
  const [selectedDateValue, setSelectedDateValue] = useState(dates[0].value);

  const filteredSchedule = data.schedule.filter((item: any) => item.date === selectedDateValue);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Date Selector */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {dates.map((d) => (
          <button
            key={d.value}
            onClick={() => setSelectedDateValue(d.value)}
            className={`flex-shrink-0 px-5 py-3 rounded-2xl transition-all border ${
              selectedDateValue === d.value 
                ? 'bg-k-green text-white shadow-soft border-k-green' 
                : 'bg-white text-gray-400 border-k-green-light'
            }`}
          >
            <span className="text-xs block opacity-80">{d.label.split(' ')[1]}</span>
            <span className="font-bold">{d.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <Card className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-cloud-sun text-gray-400 text-3xl"></i>
          <div>
            <p className="font-bold text-lg">8°C / 2°C</p>
            <p className="text-xs text-gray-500">名古屋冬末微涼，記得帶件保暖外套！</p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-k-green-light">
        {filteredSchedule.map((item: any) => (
          <div key={item.id} className="relative">
            <div className={`absolute -left-[22px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${CATEGORY_COLORS[item.category as Category] || 'bg-gray-300'}`}></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-k-brown">{item.time}</span>
              <Badge color={CATEGORY_COLORS[item.category as Category] || 'bg-gray-300'} text={item.category} />
            </div>
            <Card className="mt-2">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <i className="fa-solid fa-location-dot text-k-green"></i> {item.location}
              </p>
              {item.note && <div className="mt-3 p-2 bg-k-beige rounded-lg text-xs italic text-k-brown border-l-2 border-k-brown">「{item.note}」</div>}
            </Card>
          </div>
        ))}
        {filteredSchedule.length === 0 && (
          <p className="text-center text-gray-400 py-10 text-sm italic">這天還沒有排行程喔，來場隨興的散步吧 ☕️</p>
        )}
      </div>
    </div>
  );
};

const BookingsTab = ({ data }: { data: any }) => {
  const [isLocked, setIsLocked] = useState(true);
  const handleUnlock = () => {
    const code = prompt("請輸入隱私 PIN 碼 (提示: 007)");
    if (code === "007") {
      setIsLocked(false);
    } else {
      alert("密碼錯誤！");
    }
  };

  const { flights, stay, hsr, dayTours } = data.bookings;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-plane-departure text-k-green"></i> 航班 & 預訂
        </h2>
        <RoundedButton variant="secondary" onClick={isLocked ? handleUnlock : () => setIsLocked(true)}>
          <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'} mr-2`}></i>
          {isLocked ? '解鎖個資' : '已解鎖'}
        </RoundedButton>
      </div>

      {/* HSR Info Card */}
      {hsr && (
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-k-brown px-1 flex justify-between items-center">
             <span>台灣高鐵接駁</span>
             <span className="text-[10px] text-orange-600 font-normal">NT$ {hsr.price}</span>
           </h3>
           <Card className="bg-white border-l-8 border-l-orange-500 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 bg-orange-100 rounded-bl-xl">
               <span className="text-[10px] font-bold text-orange-700">取票號碼 {hsr.getTicketCode}</span>
             </div>
             
             <div className="flex justify-between items-start mb-4">
               <div>
                 <p className="text-[10px] text-gray-400 uppercase tracking-wider">Train No.</p>
                 <p className="text-xl font-bold text-orange-600">{hsr.trainNo}</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] text-gray-400 uppercase tracking-wider">Booking Ref.</p>
                 <p className="font-bold text-sm">{hsr.ref}</p>
               </div>
             </div>

             <div className="flex justify-between items-center bg-orange-50/50 p-3 rounded-xl mb-4">
               <div className="text-center">
                 <p className="text-xs text-gray-400">台中</p>
                 <p className="text-lg font-bold">10:36</p>
               </div>
               <div className="flex-1 flex flex-col items-center px-4">
                 <div className="w-full h-[1px] bg-orange-200 relative">
                   <i className="fa-solid fa-chevron-right text-[10px] text-orange-400 absolute -right-1 -top-[5px]"></i>
                 </div>
                 <p className="text-[10px] text-orange-400 mt-1">42 mins</p>
               </div>
               <div className="text-center">
                 <p className="text-xs text-gray-400">桃園</p>
                 <p className="text-lg font-bold">11:18</p>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4 text-xs">
               <div>
                 <p className="text-gray-400 mb-1">票種</p>
                 <p className="font-bold">{hsr.tickets}</p>
               </div>
               <div>
                 <p className="text-gray-400 mb-1">座位</p>
                 <p className="font-bold text-orange-600">{hsr.seats}</p>
               </div>
             </div>
           </Card>
        </div>
      )}

      {/* Day Tour Cards */}
      {dayTours && dayTours.length > 0 && (
        <div className="space-y-4">
           <h3 className="text-sm font-bold text-k-brown px-1">當地一日遊</h3>
           {dayTours.map((tour: any) => (
              <Card key={tour.id} className="bg-blue-50 border-blue-200 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-700 font-bold flex items-center gap-2">
                    <i className="fa-solid fa-bus"></i> {tour.provider} 一日遊
                  </span>
                  <Badge color="bg-blue-500" text={tour.date} />
                </div>
                <h4 className="font-bold text-lg text-blue-900 mb-2">{tour.title}</h4>
                {tour.orderNo && (
                  <p className="text-[10px] text-blue-600 mb-3 bg-blue-100/50 px-2 py-1 rounded-md inline-block">
                    訂單編號: <span className="font-bold">{tour.orderNo}</span>
                  </p>
                )}
                <div className="space-y-2 text-xs text-blue-800">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-clock w-4"></i>
                      <span>集合時間：<span className="font-bold">{tour.meetingTime}</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <i className="fa-solid fa-location-dot w-4 mt-0.5"></i>
                      <span>集合地點：{tour.meetingPoint}</span>
                    </div>
                </div>
                <RoundedButton variant="primary" className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => window.open(tour.url, '_blank')}>
                  <i className="fa-solid fa-up-right-from-square mr-2"></i>開啟預訂網頁
                </RoundedButton>
              </Card>
           ))}
        </div>
      )}

      {/* Flight Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-k-brown px-1">去程航班 - {flights[0].date}</h3>
        <div className="bg-[#1D2A44] rounded-3xl overflow-hidden shadow-soft-lg text-white">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold tracking-widest">{flights[0].airline}</span>
              <span className="font-bold text-sm bg-white/20 px-3 py-1 rounded-full">{flights[0].flightNo}</span>
            </div>
            <div className="flex justify-between items-center text-center">
              <div><h3 className="text-3xl font-bold">{flights[0].from}</h3><p className="text-[10px] opacity-60">Taipei</p></div>
              <div className="flex-1 px-4"><div className="w-full h-[1px] bg-white/30 relative"><i className="fa-solid fa-plane absolute -top-2 left-1/2 -translate-x-1/2"></i></div></div>
              <div><h3 className="text-3xl font-bold">{flights[0].to}</h3><p className="text-[10px] opacity-60">Nagoya</p></div>
            </div>
          </div>
          <div className="bg-white/10 px-6 py-4 flex justify-between border-t border-dashed border-white/20 text-xs">
            <div><p className="opacity-60">TERMINAL</p><p className="font-bold text-lg">{flights[0].terminal}</p></div>
            <div><p className="opacity-60">DEPARTURE</p><p className="font-bold text-lg">{flights[0].depTime}</p></div>
            <div><p className="opacity-60">ARRIVAL</p><p className="font-bold text-lg">{flights[0].arrTime}</p></div>
          </div>
        </div>
      </div>

      {/* Hotel Card */}
      <h3 className="text-sm font-bold text-k-brown px-1 pt-4">住宿資訊</h3>
      <Card className="p-0 overflow-hidden">
        <div className="bg-k-stay h-24 flex items-center justify-center text-white relative">
          <i className="fa-solid fa-hotel text-4xl opacity-50"></i>
          <div className="absolute bottom-2 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] flex items-center gap-1">
             <i className="fa-solid fa-elevator"></i> 伏見站 10 號出口有電梯
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl mb-1">{stay.name}</h3>
          <p className="text-xs text-gray-500 flex items-start gap-1 mb-2">
            <i className="fa-solid fa-location-dot mt-0.5 text-k-green"></i>
            {stay.address}
          </p>
          <p className="text-[10px] text-k-brown bg-k-beige px-2 py-1 rounded-md mb-4 inline-block">
            <i className="fa-solid fa-directions mr-1"></i> {stay.transport}
          </p>
          
          <div className="space-y-3 bg-k-beige/50 p-4 rounded-2xl border border-k-green-light mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">電話</span>
              <span className="font-bold">{stay.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">預訂編號</span>
              <span className="font-bold text-k-accent">{stay.ref}</span>
            </div>
            <div className="flex justify-between text-sm items-center border-t border-k-green-light/30 pt-2">
              <span className="text-gray-400">支付卡號 (後四碼)</span>
              {isLocked ? (
                <span className="text-gray-300 italic text-xs">已鎖定</span>
              ) : (
                <span className="font-bold tracking-widest">**** **** **** {stay.cardLastFour}</span>
              )}
            </div>
          </div>

          {/* Hotel Facilities Grid */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">飯店設施</p>
            <div className="grid grid-cols-4 gap-2">
               <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                 <i className="fa-solid fa-soap text-k-green text-xs mb-1"></i>
                 <span className="text-[8px] text-center leading-tight">洗烘衣機</span>
               </div>
               <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                 <i className="fa-solid fa-faucet-dotted text-k-green text-xs mb-1"></i>
                 <span className="text-[8px] text-center leading-tight">飲水機</span>
               </div>
               <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                 <i className="fa-solid fa-cubes text-k-green text-xs mb-1"></i>
                 <span className="text-[8px] text-center leading-tight">製冰機</span>
               </div>
               <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                 <i className="fa-solid fa-hot-tub-person text-k-green text-xs mb-1"></i>
                 <span className="text-[8px] text-center leading-tight">微波爐</span>
               </div>
            </div>
          </div>

          {/* Hotel Tips */}
          <div className="bg-k-accent/5 p-4 rounded-2xl border border-k-accent/20">
             <p className="text-[10px] font-bold text-k-accent mb-2 uppercase tracking-widest">入住小撇步</p>
             <ul className="space-y-2">
               {stay.tips.map((tip: string, idx: number) => (
                 <li key={idx} className="text-[11px] text-k-brown flex items-start gap-2">
                   <i className="fa-solid fa-circle-info mt-0.5 opacity-50"></i>
                   {tip}
                 </li>
               ))}
             </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <RoundedButton variant="secondary" className="w-full text-xs" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stay.address)}`, '_blank')}>
              <i className="fa-solid fa-map-location-dot mr-2"></i>開啟地圖
            </RoundedButton>
            <RoundedButton variant="secondary" className="w-full text-xs">
              <i className="fa-solid fa-phone mr-2"></i>撥打電話
            </RoundedButton>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ExpenseTab = ({ data }: { data: any }) => {
  const total = data.expenses.reduce((acc: number, cur: any) => acc + (cur.amount * (cur.currency === 'JPY' ? 0.21 : 1)), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="bg-k-green text-white">
        <p className="text-xs opacity-80 mb-1">總預算概覽</p>
        <h2 className="text-3xl font-bold">NT$ {total.toLocaleString()}</h2>
        <p className="text-[10px] opacity-70 mt-1">匯率估計 JPY 1 = NT$ 0.21</p>
      </Card>
      {data.expenses.length > 0 ? (
        <div className="space-y-3">
          {data.expenses.map((item: any) => (
            <Card key={item.id} className="flex justify-between items-center py-3">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-k-beige flex items-center justify-center text-k-brown">
                   <i className="fa-solid fa-wallet"></i>
                 </div>
                 <div>
                   <p className="font-bold text-sm">{item.title}</p>
                   <p className="text-[10px] text-gray-400">{item.date}</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold">{item.currency} {item.amount.toLocaleString()}</p>
                 <p className="text-[10px] text-gray-400">NT$ {(item.amount * (item.currency === 'JPY' ? 0.21 : 1)).toFixed(0)}</p>
               </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=empty&backgroundColor=F7F4EB" className="w-20 mx-auto opacity-20 mb-4" />
          <p className="text-gray-400 text-sm">目前還沒有記帳資料喔</p>
          <RoundedButton className="mt-4" variant="secondary">新增第一筆支出</RoundedButton>
        </div>
      )}
    </div>
  );
};

const SettingsTab = ({ data, setData }: { data: any, setData: any }) => {
  const [jsonInput, setJsonInput] = useState("");

  const handleImport = () => {
    if (importDataFromText(jsonInput)) {
      setData(getInitialData());
      setJsonInput("");
      alert("匯入完成！");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportDataAsText(data));
    alert("已複製到剪貼簿，你可以貼到記事本存檔！");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <i className="fa-solid fa-gear text-k-green"></i> 筆記本管理
      </h2>
      
      {/* File Structure Visualizer */}
      <Card className="bg-k-brown/5 border-k-brown/20">
        <h3 className="font-bold text-k-brown flex items-center gap-2 mb-4">
          <i className="fa-solid fa-folder-tree"></i> 專案檔案結構地圖
        </h3>
        <div className="bg-white/50 p-4 rounded-xl font-mono text-xs text-k-brown leading-relaxed border border-k-brown/10">
          <div className="flex items-center gap-2">📂 nagoya-trip-app/</div>
          <div className="ml-4 flex items-center gap-2">📄 index.html</div>
          <div className="ml-4 flex items-center gap-2">📄 App.tsx</div>
          <div className="ml-4 flex items-center gap-2">📄 types.ts</div>
          <div className="ml-4 flex items-center gap-2">📄 constants.tsx</div>
          <div className="ml-4 flex items-center gap-2">📄 manifest.json</div>
          <div className="ml-4 flex items-center gap-2">📁 components/</div>
          <div className="ml-8 flex items-center gap-2">📄 Layout.tsx</div>
          <div className="ml-8 flex items-center gap-2">📄 Card.tsx</div>
          <div className="ml-4 flex items-center gap-2">📁 lib/</div>
          <div className="ml-8 flex items-center gap-2">📄 storage.ts</div>
        </div>
        <p className="mt-3 text-[10px] text-k-brown opacity-70 italic">
          * 請確保你的電腦資料夾與上面的結構一模一樣喔！
        </p>
      </Card>

      {/* Deployment Help Section */}
      <Card className="bg-k-green/10 border-k-green/30">
        <h3 className="font-bold text-k-green-dark flex items-center gap-2">
          <i className="fa-solid fa-rocket"></i> 檔案建立完成後...
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex gap-3">
            <div className="bg-k-green text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
            <div>
              <p className="text-sm font-bold">上傳到 Vercel</p>
              <p className="text-xs text-gray-500">將整個 `nagoya-trip-app` 資料夾上傳到 Vercel 或是 GitHub。</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-k-green text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
            <div>
              <p className="text-sm font-bold">手機 Safari 安裝</p>
              <p className="text-xs text-gray-500">使用 iPhone Safari 開啟網址，點擊「加入主畫面」。</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold mb-2">資料備份 (JSON)</h3>
        <RoundedButton onClick={copyToClipboard} className="w-full">複製備份文字</RoundedButton>
      </Card>

      <Card>
        <h3 className="font-bold mb-2">匯入資料</h3>
        <textarea 
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="貼上 JSON 文字..."
          className="w-full h-32 p-3 text-xs bg-k-beige rounded-xl border-none focus:ring-2 focus:ring-k-green outline-none"
        />
        <RoundedButton onClick={handleImport} variant="accent" className="w-full mt-4">確認匯入</RoundedButton>
      </Card>

      <div className="text-center pt-10 pb-6 opacity-30">
        <p className="text-xs italic">Komorebi Travel Planner v2.0</p>
        <p className="text-[10px]">新增檔案結構地圖指南</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [data, setData] = useState(getInitialData());

  useEffect(() => {
    saveToLocal(data);
  }, [data]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="mb-4">
        {activeTab === 'schedule' && (
          <div className="flex justify-between items-center mb-2 px-1">
             <h2 className="text-xl font-bold text-k-brown">Schedule</h2>
             <span className="text-[10px] bg-k-green-light px-2 py-0.5 rounded-full text-k-green-dark">2/25 - 3/3</span>
          </div>
        )}
      </div>
      {activeTab === 'schedule' && <ScheduleTab data={data} />}
      {activeTab === 'bookings' && <BookingsTab data={data} />}
      {activeTab === 'expense' && <ExpenseTab data={data} />}
      {activeTab === 'journal' && <div className="p-10 text-center text-gray-400 italic">日誌功能趕工中... 📸</div>}
      {activeTab === 'planning' && <SettingsTab data={data} setData={setData} />}
    </Layout>
  );
};

export default App;
