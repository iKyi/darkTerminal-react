import { Stack, TextField, Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TerminalModalWrapper from "../components/Reusable/TerminalModalWrapper";
import { setCode, setCodeAuthModal } from "../features/game/gameSlice";
import { LOCALCODEKEY } from "../constants/localCodeKey";

export type GameCodeAuthModalPropsType = {};

interface IFormInterface {
  [propertyName: string]: string;
}

const GameCodeAuthModal: React.VFC<GameCodeAuthModalPropsType> = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<IFormInterface>({
    one: "",
    two: "",
    three: "",
    four: "",
  });

  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const buttonFref = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const open = useAppSelector((state) => state.game.game.codeAuthModalVisible);

  useEffect(() => {
    setTimeout(() => {
      const localCode = localStorage.getItem(LOCALCODEKEY.VALUE);
      console.log(localCode);
      if (
        localCode &&
        ref1.current &&
        ref2.current &&
        ref3.current &&
        ref4.current
      ) {
        setValues({
          one: localCode[0],
          two: localCode[1],
          three: localCode[2],
          four: localCode[3],
        });
        buttonFref.current?.focus();
      }
    }, 400);
  }, []);

  const goBackAction = () => {
    dispatch(setCodeAuthModal(false));
    navigate("/");
  };

  const onInputChange = (
    event: React.ChangeEventHandler<HTMLInputElement>,
    numberIndex: string
  ) => {
    let value = (event as any).target.value;

    value = value[value.length - 1];

    setValues({ ...values, [numberIndex]: value });

    switch (numberIndex) {
      case "one":
        ref2 && ref2.current && (ref2 as any).current.focus();
        break;
      case "two":
        ref2 && ref2.current && (ref3 as any).current.focus();
        break;
      case "three":
        ref2 && ref2.current && (ref4 as any).current.focus();
        break;
      default:
        break;
    }
  };

  const allInputsHaveValue = useMemo(() => {
    const validInputs = Object.keys(values).every(
      (key: keyof IFormInterface) => values[key] && values[key].length > 0
    );
    if (validInputs) {
      setTimeout(() => {
        buttonFref && buttonFref.current && (buttonFref as any).current.focus();
      }, 200);
    }
    return validInputs;
  }, [values]);

  useEffect(() => {
    return () => {
      setValues({
        one: "",
        two: "",
        three: "",
        four: "",
      });
    };
  }, []);

  const submitAction = () => {
    const finalValue = `${values["one"]}${values["two"]}${values["three"]}${values["four"]}`;
    localStorage.setItem(LOCALCODEKEY.VALUE, finalValue);
    dispatch(setCode(finalValue));
    dispatch(setCodeAuthModal(false));
  };

  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper
      open={open}
      baseWidth={700}
      bigTitle={`LOGIN INTO THE DARK TERMINAL`}
    >
      <Box
        sx={{
          py: 3,
          px: 4,
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            inputRef={ref1}
            variant="outlined"
            autoFocus
            type="tel"
            value={values.one}
            onChange={(event) =>
              onInputChange(
                event as unknown as React.ChangeEventHandler<HTMLInputElement>,
                "one"
              )
            }
          />
          <TextField
            inputRef={ref2}
            variant="outlined"
            type="tel"
            value={values.two}
            onChange={(event) =>
              onInputChange(
                event as unknown as React.ChangeEventHandler<HTMLInputElement>,
                "two"
              )
            }
          />
          <TextField
            inputRef={ref3}
            variant="outlined"
            type="tel"
            value={values.three}
            onChange={(event) =>
              onInputChange(
                event as unknown as React.ChangeEventHandler<HTMLInputElement>,
                "three"
              )
            }
          />
          <TextField
            inputRef={ref4}
            variant="outlined"
            type="tel"
            value={values.four}
            onChange={(event) =>
              onInputChange(
                event as unknown as React.ChangeEventHandler<HTMLInputElement>,
                "four"
              )
            }
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          sx={{ mt: 4 }}
          justifyContent="space-between"
        >
          <Button
            ref={buttonFref}
            variant="outlined"
            color="primary"
            onClick={() => goBackAction()}
          >
            Back
          </Button>

          <Button
            size="large"
            ref={buttonFref}
            variant="contained"
            color="primary"
            disabled={!allInputsHaveValue}
            onClick={submitAction}
          >
            PROCEED
          </Button>
        </Stack>
      </Box>
    </TerminalModalWrapper>
  );
};

export default GameCodeAuthModal;
