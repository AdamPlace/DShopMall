import ContentLayout from "@components/Layout/ContentLayout";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState, useEffect } from "react";
import Button from "@components/Member/Button";
import Link from "next/link";

const orderList = [
  {
    id: 1,
    date: "23.09.20",
    name: "화장품명1",
    price: 72000,
    state: "입금 대기",
  },
  {
    id: 2,
    date: "23.09.18",
    name: "화장품명2",
    price: 90000,
    state: "배송 준비",
  },
  {
    id: 3,
    date: "23.09.15",
    name: "화장품명2",
    price: 90000,
    state: "주문 완료",
  },
];

export default function Mypage() {
  const [orderHistory, setOrderHistory] = useState(orderList);
  const [accumulation, setAccumulation] = useState([]);
  const [post, setPost] = useState(false);

  useEffect(() => {
    setOrderHistory(orderList);
  }, []);

  const onPostClick = () => {
    setPost(true);
  };

  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setPost(false);
  };

  const foldDaumPostcode = () => {
    // iframe을 넣은 element를 안보이게 한다.
    setPost(false);
  };
  return (
    <>
      <Header title="마이페이지" description="마이페이지" />
      <ContentLayout>
        <div className="max-w-[960px] m-auto">
          {/* 마이페이지 레이아웃 */}
          <div className="px-4 pt-[60px] pb-[70px] flex justify-between">
            {/* 마이페이지 왼쪽 컨텐츠 */}
            <div className="w-[45%]">
              {/* 주문 내역 */}
              <div className="mb-[70px]">
                <div className="my_title">주문 내역</div>
                <div>
                  {orderHistory.length > 0 ? (
                    <>
                      <div className="grid grid-cols-[20%_40%_20%_20%] border-b border-b-[#ddd] text-sm pb-3">
                        <div>주문일자</div>
                        <div>상품 정보</div>
                        <div className="text-right">가격</div>
                        <div className="text-right">상태</div>
                      </div>
                      {orderHistory.map((order) => (
                        <Link href={`/orderDetails/${order.id}`} key={order.id}>
                          <div className="grid grid-cols-[20%_40%_20%_20%] border-b border-b-[#ddd] text-sm py-4 items-center cursor-pointer">
                            <div>{order.date}</div>
                            <div>{order.name}</div>
                            <div className="text-right">
                              {order.price.toLocaleString()}원
                            </div>
                            <div className="text-right">{order.state}</div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="py-[100px] text-center">
                      주문 내역이 없습니다.
                    </div>
                  )}
                </div>
              </div>
              {/* 적립금 내역 */}
              <div>
                <div className="my_title">적립금 내역</div>
                <div>
                  {accumulation.length > 0 ? (
                    <></>
                  ) : (
                    <div className="py-[100px] text-center">
                      적립금 내역이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* 마이페이지 오른쪽 컨텐츠 */}
            <div className="w-[45%]">
              <div className="my_title">회원 정보</div>
              <div className="my-5 flex justify-end text-sm">
                <div className="text-[#999]">로그아웃</div>
              </div>
              <div className="text-sm">
                <form action="">
                  <div className="my_input_box">
                    <div className="my_label">이메일</div>
                    <div>
                      <input type="text" className="my_input" />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">이름</div>
                    <div>
                      <input type="text" className="my_input" />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">연락처</div>
                    <div className="flex justify-between items-center">
                      <input
                        type="number"
                        className="my_input"
                        minLength={3}
                        maxLength={3}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        className="my_input"
                        minLength={3}
                        maxLength={4}
                      />
                      <div className="px-3">-</div>
                      <input
                        type="number"
                        className="my_input"
                        minLength={4}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">우편번호</div>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        className="my_input read-only:bg-[#f9f9f9]"
                        readOnly
                      />
                      <div
                        className="w-[140px] h-[45px] ml-3 text-center leading-[45px] text-[#6846b7] border border-[#6846b7] rounded-[23px] cursor-pointer hover:bg-[#6846b7] hover:text-white ease-in-out duration-300"
                        onClick={onPostClick}
                      >
                        검색하기
                      </div>
                    </div>
                    {post && (
                      <div
                        id="wrap"
                        className="border border-[#333] w-[420px] h-[402px] my-[10px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                      >
                        <img
                          src="//t1.daumcdn.net/postcode/resource/images/close.png"
                          className="cursor-pointer absolute right-0 top-[-1px] z-10"
                          onClick={foldDaumPostcode}
                          alt="접기 버튼"
                        />
                        <DaumPostcodeEmbed onComplete={handleComplete} />
                      </div>
                    )}
                  </div>
                  <div className="my_input_box">
                    <div className="my_label">주소</div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="my_input read-only:bg-[#f9f9f9]"
                        readOnly
                      />
                    </div>
                    <div>
                      <input type="text" className="my_input" />
                    </div>
                  </div>
                  <div className="my_input_box">
                    <div className="mb-3">마케팅 정보 수신 동의</div>
                    <div className="flex">
                      <div className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          id="agreeEmail"
                          className="mr-2 w-[14px] h-[14px] accent-[#7a1cea]"
                        />{" "}
                        <label htmlFor="agreeEmail">이메일</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="agreeMessage"
                          className="mr-2 w-[14px] h-[14px] accent-[#7a1cea]"
                        />{" "}
                        <label htmlFor="agreeMessage">문자 메세지</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center text-[#999] mt-5 mb-[30px]">
                    <Link href={"/changePassword"}>
                      <div className="mr-5 cursor-pointer">
                        비밀번호 변경하기
                      </div>
                    </Link>
                    <div>탈퇴하기</div>
                  </div>
                  <div className="text-center">
                    <Button text="변경 사항 저장하기" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
      <Footer />
      <style jsx>{`
        .my_title {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 40px;
        }
        .my_input_box {
          margin-bottom: 16px;
        }
        .my_label {
          margin-bottom: 5px;
        }
        .my_input {
          border: 1px solid #d8d8d8;
          border-radius: 3px;
          padding: 10px;
          width: 100%;
          height: 45px;
        }
      `}</style>
    </>
  );
}
