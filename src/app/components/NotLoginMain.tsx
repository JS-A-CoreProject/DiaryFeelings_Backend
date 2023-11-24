import { useState } from "react";
import Link from 'next/link';

const NotLoginMain = () => {
    const [hover, setHover] = useState<string | null>('first'); // 초기값 설정
    const [lastHoveredImage, setLastHoveredImage] = useState<string | null>(null);

    const handleMouseOver = (image: string) => {
        setHover(image);
        setLastHoveredImage(image); // 마지막으로 호버된 이미지 업데이트
    };

    const handleMouseOut = () => {

    };

    const renderImage = (imageSource: string) => {
        return (
            <div className="w-[1200px] h-[680px] mt-[5px] mb-[10px] flex justify-center ">
                <Link href="/api/auth/signin">
                    <img
                        src={imageSource}
                        alt="Descriptive Text of Image"
                        className="object-contain transition-opacity duration-500"
                    />
                </Link>
            </div>
        );
    };

    // 이미지 렌더링 조건을 수정하여 호버된 이미지 또는 마지막으로 호버된 이미지를 표시
    const shouldRenderImage = (image: string) => {
        return hover === image || lastHoveredImage === image;
    };

    return (
        <div className="w-full flex flex-col justify-center items-center pt-[150px] pb-[150px]">
            <div className="flex flex-col justify-center items-center">
                <span className="text-[60px] font-bold">
                    감정을 기록하는 일기
                </span>
                <span className="text-lg mb-[60px] mt-[50px]" >
                    당신의 감정을 기록하고, 되돌아 보세요.
                </span>
                <Link href="/api/auth/signin">
                    <span className="mt-[100px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer">
                        내 감정을 기록하기
                    </span>
                </Link>
            </div>

            <div className="flex flex-col w-full justify-center items-center mt-[90px]">
                <div className="border w-[1200px] h-[300px] overflow-hidden">
                    <img src="/ddiary.png" alt="Descriptive Text of Image" className="w-full h-auto object-contain object-center" />
                </div>

                <div className="flex justify-center items-center w-full space-x-4 mt-[100px] mb-[50px]">
                    {/* 일기 작성하기 Section */}
                    <div className="flex items-center p-[20px]">
                        <div className={`flex flex-col justify-center items-start p-[15px] rounded-md border cursor-pointer duration-200 ${hover === 'first' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('first')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[10px]">
                                <div className="w-[20px] h-[20px] border rounded-md bg-[#b2a4d4]"></div>
                                <span className="text-[20px] ml-[8px] font-bold">일기 작성</span>
                            </div>
                            <div className="flex justify-center items-center text-[14px]">
                                <p className="text-[17px] w-[230px] h-[60px]">

                                    "일기를 작성하면 <br />AI가 감정을 알려줘요."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 나에게 한 마디 Section */}
                    <div className="flex items-center p-[20px]">
                        <div className={`flex flex-col justify-center items-start p-[15px] rounded-md border cursor-pointer duration-200 ${hover === 'second' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('second')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[10px]">
                                <div className="w-[20px] h-[20px] border rounded-md bg-[#ffe4b5]"></div>
                                <span className="text-[20px] ml-[8px] font-bold">나에게 한 마디</span>
                            </div>
                            <div className="flex justify-center items-center text-[14px]">
                            <p className=" text-[17px] w-[230px] h-[60px]">
                                "오늘 하루 있던 일을 털어놔 봐요. <br />AI가 조언해 줄거에요."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 달력 보기 Section */}
                    <div className="flex items-center p-[20px]">
                        <div className={`flex flex-col justify-center items-start p-[15px] rounded-md border cursor-pointer duration-200 ${hover === 'third' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('third')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[10px]">
                                <div className="w-[20px] h-[20px] border rounded-md bg-[#b0c4de]"></div>
                                <span className="text-[20px] ml-[8px] font-bold">달력 보기</span>
                            </div>
                            <div className="flex justify-center items-center text-[14px]">
                            <p className="text-[17px] w-[230px] h-[60px]">
                                "한달 간의 감정을 둘러보고, <br /> 일기를 다시 들여다 보아요."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 감정 그래프 Section */}
                    <div className="flex items-center p-[20px]">
                        <div className={`flex flex-col justify-center items-start p-[15px] rounded-md border cursor-pointer duration-200 ${hover === 'fourth' ? 'bg-white shadow-2xl' : 'bg-gray-100 shadow-lg'}`}
                            onMouseOver={() => handleMouseOver('fourth')}
                            onMouseOut={() => handleMouseOut()}
                        >
                            <div className="flex justify-center items-center mb-[10px]">
                                <div className="w-[20px] h-[20px] border rounded-md bg-[#a9a9a9]"></div>
                                <span className="text-[20px] ml-[8px] font-bold">감정 그래프</span>
                            </div>
                            <div className="flex justify-center items-center text-[14px]">
                            <p className="text-[17px] w-[230px] h-[60px]">
                                "한 달 간의 감정 추이를 보며,<br /> 자신의 감정을 조절 해봐요."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 페이지 이용 방법 이미지 Section */}
                {shouldRenderImage('first') && renderImage("/일기작성.png")}
                {shouldRenderImage('second') && renderImage("/한마디.png")}
                {shouldRenderImage('third') && renderImage("/달력.png")}
                {shouldRenderImage('fourth') && renderImage("/감정그래프.png")}

                {/* 나머지 컴포넌트 부분 */}
                <div className="w-full flex justify-center items-center mt-[10px]">
                    {/* 로그인 페이지로 이동하는 Link */}
                    <Link href="/api/auth/signin">
                        <span className="mt-[0px] text-[30px] px-[24px] py-[12px] border rounded-md text-white bg-[#b2a4d4] cursor-pointer" style={{ marginTop: '100px' }}>
                            감정을 기록하러 가볼까요?
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotLoginMain;
