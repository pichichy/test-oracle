sql_listaEmpleados = `select emp_k_rutemplead rut, emp_a_nombre nombre, emp_a_apellpater apepat from mae_empleado where SYS_C_CODESTADO = 1`;

sql_getEmpleado = "select emp_k_rutemplead rut, emp_a_nombre nombre, emp_a_apellpater apepat from mae_empleado where emp_k_rutemplead = :k and SYS_C_CODESTADO = 1";

sql_datos_basicos = `SELECT E.EMPL_CODG codigo_empleado, 
E.SYS_C_TIPODOCU codigo_doc_identificacion,
(SELECT CODE_DESC
   FROM SYS_CODE_FALA
  WHERE domain_code = 104
    AND CODE = E.SYS_C_TIPODOCU) desc_doc_identificacion,
E.EMP_K_RUTEMPLEAD rut,
E.EMP_A_DIGVERRUT dv,
E.EMP_A_APELLPATER apellido_paterno,
E.EMP_A_APELLMATER apellido_materno,
E.EMP_A_NOMBRE nombres,
TO_CHAR(E.EMP_F_FECHANACIM, 'DD-MM-YYYY') fecha_nacimiento,
E.SYS_C_ESTADCIVIL codigo_estado_civil,
(select initcap(code_desc)
   from sys_code
  where domain_code = 737
    and code = E.sys_c_estadcivil) desc_estado_civil,
E.SYS_C_NACIONALID codigo_nacionalidad,
(select initcap(code_desc)
   from sys_code
  where domain_code = 701
    and code = E.Sys_c_Nacionalid) desc_nacionalidad,
E.SYS_C_SITUACMILI codigo_sit_militar,
(select initcap(code_desc)
   from sys_code
  where domain_code = 702
    and code = E.sys_c_situacmili) desc_sit_militar,
E.EMP_C_SEXO sexo,
E.EMP_N_FONO telefono,
E.EMP_A_DOMICILIO domicilio,
E.SYS_C_COMUNA codigo_comuna,
(select initcap(loge_dscr)
   from loca_geog
  where loge_tipo = '05'
    and loge_codg = E.sys_c_comuna) desc_comuna, 
E.SYS_C_CIUDAD codigo_ciudad,
(select initcap(loge_dscr)
   from loca_geog
  where loge_tipo = '04'
    and loge_codg = E.sys_c_ciudad) desc_ciudad,
E.SYS_C_ESTUDIO codigo_estudios,
(select initcap(code_desc)
   from sys_code
  where domain_code = 706
    and code = E.sys_c_estudio) desc_estudios,
E.SYS_C_PROFESION codigo_profesion,
(select initcap(code_desc)
   from sys_code
  where domain_code = 716
    and code = E.sys_c_profesion) desc_profesion,
E.EMP_C_INDTITULO ind_titulo,
E.EMP_C_UNIVERSIDAD codigo_inst_educacional,
(select initcap(code_desc)
   from sys_code_fala
  where domain_code = 619
    and code = E.emp_c_universidad) desc_inst_educacional,
E.sys_c_experlabor codigo_exp_laboral,
(select initcap(code_desc)
   from sys_code
  where domain_code = 709
    and code = E.sys_c_experlabor) desc_exp_laboral,
E.sys_c_sitcontrac codigo_sit_contractual,
(select initcap(code_desc)
   from sys_code
  where domain_code = 782
    and code = E.sys_c_sitcontrac) desc_sit_contractual,
TO_CHAR(E.EMP_F_INICICONTR, 'DD-MM-YYYY') fecha_inicio_contrato,
TO_CHAR(E.EMP_F_TERMICONTR, 'DD-MM-YYYY') fecha_termino_contrato,
TO_CHAR(E.EMP_F_INDEMNIZAB, 'DD-MM-YYYY') fecha_indemnizable,
E.SYS_C_CODESTADO codigo_estado,
(SELECT CODE_DESC
   FROM SYS_CODE
  WHERE domain_code = 715
    AND CODE = E.SYS_C_CODESTADO) desc_estado,
E.SYS_C_TIPOJORNAD codigo_jornada,
(select code_desc
   from sys_code
  where domain_code = 775
    and code = E.sys_c_tipojornad) desc_jornada,
E.sys_c_motivocontr codigo_motivo_contratacion,
(select initcap(code_desc)
   from sys_code
  where domain_code = 825
    and code = E.sys_c_motivocontr) desc_motivo_contratacion,
E.sys_c_codigopago codigo_pago,
(select initcap(code_desc)
   from sys_code
  where domain_code = 723
    and code = E.sys_c_codigopago) desc_pago,
E.sys_c_codbanco codigo_banco,
(select initcap(code_desc)
   from sys_code
  where domain_code = 705
    and code = E.sys_c_codbanco) desc_banco,
E.emp_n_numctacte num_cta_cte,
E.Emp_n_Cod_Ofibanco cod_ofi_banco,
(select desc_oficina
   from oficina_banco
  where cod_banco = E.sys_c_codbanco
    and cod_oficina = E.Emp_n_Cod_Ofibanco) desc_ofi_banco,
E.emp_c_indtarjeta ind_tarjeta,
E.emp_c_indhorext ind_horas_extra,
E.emp_n_fonoavieme fono_emergencia,
E.emp_g_avisemerg aviso_emergencia,
to_char(E.Emp_f_Contanterior, 'dd-mm-yyyy') fecha_reconocimiento,
E.emp_n_diasferneg feriados_adicionales,
TRUNC(ROUND(months_between(SYSDATE, E.EMP_F_INICICONTR)) / 12) ||
' AÑOS' || DECODE((ROUND(months_between(SYSDATE, E.EMP_F_INICICONTR) - (12 * (TRUNC(ROUND(months_between(SYSDATE, E.EMP_F_INICICONTR)) / 12))))), '0',  '', ', ' || (ROUND(months_between(SYSDATE, E.EMP_F_INICICONTR) - (12 * (TRUNC(ROUND(months_between(SYSDATE,E.EMP_F_INICICONTR)) / 12))))) ||' MESES') antiguedad ,
(Select code_desc
   from SYS_CODE
  where domain_code = 740
    and code_aux =

(select sys_c_codpais
   from mae_ciaempresa
  where cia_k_empresa = e.cia_k_empresa)
    and code = E.emp_c_monedapago) moneda_pago,
TO_CHAR(E.EMP_F_CAMBIOCONTR, 'DD-MM-YYYY') fecha_cambio_contrato,
decode(E.emp_c_huella, '0', 'S', '1', 'N') exige_huella,
E.sys_c_gruporeloj codigo_grupo_reloj,
(select code_desc
   from sys_code_fala
  where domain_code = 302
    and code = '999')   FROM MAE_EMPLEADO E  WHERE E.EMP_K_RUTEMPLEAD = :rut  AND E.sys_c_codestado = 1  desc_grupo_reloj`;