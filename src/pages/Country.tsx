import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { country, favoriteCountries, required, wentCountry } from "../atoms";
import {
  Container,
  FormStyle,
  InnerContainer,
  Btn,
  labelClass,
  inputClass,
  ErrorTitle,
  ButtonClass,
  ChildClass,
  InnerChildDiv,
} from "../styles/CountryStyled";
import { useEffect } from "react";

// interface
interface DataType {
  name: string;
}

// main
export default function Country() {
  const { register, handleSubmit } = useForm<DataType>();
  const [require, setRequired] = useRecoilState(required);

  const [countries, setCountries] = useRecoilState(country);
  const [went, setWent] = useRecoilState(wentCountry);
  const [favorite, setFavorite] = useRecoilState(favoriteCountries);

  // localStorage에서 가져온 값이 null이 아닐 때만 JSON.parse()를 사용
  // const storageCountries = localStorage.getItem("countries");
  // const storageWent = localStorage.getItem("wet");
  // const storageFavorite = localStorage.getItem("favorite");
  // const countryList = storageCountries ? JSON.parse(storageCountries) : [];
  // const wentList = storageWent ? JSON.parse(storageWent) : [];
  // const favoriteList = storageFavorite ? JSON.parse(storageFavorite) : [];

  // function
  const onSubmit = (data: DataType) => {
    const { name } = data;

    if (name === "") {
      setRequired(() => true);
    } else {
      setRequired(() => false);

      // array에 존재하지 않을 때만 추가한다.
      if (countries.length === 0)
        setCountries((currentArr) => [name, ...currentArr]);
      else {
        const arr = countries.filter((country) => name === country);
        arr.length === 0 && setCountries((currentArr) => [name, ...currentArr]);
      }
    }
  };

  // 이동
  const move = (country: string, title: string) => {
    switch (title) {
      case "went":
        setWent((currentArr) => [country, ...currentArr]);
        setCountries((currentArr) =>
          currentArr.filter((data) => data !== country)
        );
        break;
      case "favorite":
        setFavorite((currentArr) => [country, ...currentArr]);
        setWent((currentArr) => currentArr.filter((data) => data !== country));
        break;
    }
  };

  // 삭제
  const remove = (country: string, title: string) => {
    switch (title) {
      case "remove":
        setCountries((currentArr) =>
          currentArr.filter((data) => data !== country)
        );
        break;
      case "went":
        setCountries((currentArr) => [country, ...currentArr]);
        setWent((currentArr) => currentArr.filter((data) => data !== country));
        break;
      case "favorite":
        setFavorite((currentArr) =>
          currentArr.filter((data) => data !== country)
        );
        setWent((currentArr) => [country, ...currentArr]);
        break;
    }
  };

  // hooks
  // 화면 첫 렌더링하자마자 localStorage에 저장된 정보 호출하여 atoms에 저장한다.
  useEffect(() => {
    const storedCountries = localStorage.getItem("countries");
    const storedWent = localStorage.getItem("went");
    const storedFavorite = localStorage.getItem("favorite");

    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
    }

    if (storedWent) {
      setWent(JSON.parse(storedWent));
    }

    if (storedFavorite) {
      setFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  // list 값이 변경될때마다 localStorage에 저장한다.
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries)); // 가고싶은 나라들
    localStorage.setItem("went", JSON.stringify(went)); // 가본 나라들
    localStorage.setItem("favorite", JSON.stringify(favorite)); // 좋아하는 나라들
  }, [countries, went, favorite]);

  return (
    <>
      <Container>
        <ChildClass>
          <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <InnerContainer>
              <label className={labelClass} htmlFor="country">
                내가 가고싶은 나라들
              </label>
              <input
                {...register("name")}
                id="country"
                type="text"
                placeholder="이름"
                className={inputClass}
              />
            </InnerContainer>

            {require ? (
              <ErrorTitle>
                <span className="font-medium">😖 required!</span>
              </ErrorTitle>
            ) : null}

            <Btn>가자!</Btn>
          </FormStyle>

          <InnerContainer>
            {countries?.map((country, i) => (
              <InnerChildDiv key={i}>
                <span>{country}</span> &nbsp;
                <button
                  type="button"
                  className={ButtonClass}
                  onClick={() => move(country, "went")}
                >
                  ✅
                </button>
                &nbsp;
                <button
                  type="button"
                  onClick={() => remove(country, "remove")}
                  className={ButtonClass}
                >
                  🗑️
                </button>
              </InnerChildDiv>
            ))}
          </InnerContainer>

          <InnerContainer>
            <h3>내가 가본 나라들</h3>
            {went?.map((country, i) => (
              <InnerChildDiv key={i}>
                <span>{country}</span> &nbsp;
                <button
                  type="button"
                  className={ButtonClass}
                  onClick={() => move(country, "favorite")}
                >
                  👍🏻
                </button>
                &nbsp;
                <button
                  type="button"
                  className={ButtonClass}
                  onClick={() => remove(country, "went")}
                >
                  ❌
                </button>
              </InnerChildDiv>
            ))}
          </InnerContainer>

          <InnerContainer>
            <h3>내가 좋아하는 나라들</h3>
            {favorite?.map((country, i) => (
              <InnerChildDiv key={i}>
                <span>{country}</span> &nbsp;
                <button
                  type="button"
                  className={ButtonClass}
                  onClick={() => remove(country, "favorite")}
                >
                  👎🏻
                </button>
              </InnerChildDiv>
            ))}
          </InnerContainer>
        </ChildClass>
      </Container>
    </>
  );
}
